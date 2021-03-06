// подключение стилей
import '../../assets/scss/base.scss';
import '../../assets/scss/main.scss';

import './index.scss';

// БЭМ
import '../../components/center-p/center-p.scss';

// JS modules
import { getAfterContent } from '../../assets/js/getAfterContent.js';

// временные стили
// import "../../assets/scss/temporality.scss";

// ==================================================================== index.js
// =============================================================================
('use strict');

// === variables color =========================================================
let $pageBgColor = getAfterContent('#pageBgColor');
let $canvasBgColor = getAfterContent('#canvasBgColor');
let $panelBgColor = getAfterContent('#panelBgColor');
let $canvasFigureBg = getAfterContent('#canvasFigureBg');
let $canvasText = getAfterContent('#canvasText');
let $canvasBrick = getAfterContent('#canvasBrick');

// === canvas ==================================================================
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// === размеры игрового экрана
let screen_x = 0;
let screen_y = 0;
let screenWidth = canvas.width;
let screenHeight = canvas.height;

let screenLeftSide = 0;
let screenRightSide = canvas.width;
let screenTopSide = 0;
let screenBottomSide = canvas.height;

// ====== мячик
// === координаты мячика
let ball_x = canvas.width / 2;
let ball_y = canvas.height - 30;
// === ускорение движения
let ballSpeed = 1.025;
// === направление движения по осям
let ball_dx = 1;
let ball_dy = -1;
// === радиус мячика
let ballRadius = 10;

// === ракетка
let padHeight = 10;
let padWidth = 75;
let pad_x = canvas.width / 2 - padWidth / 2;
let pad_y = canvas.height - padHeight;
let padLeftSide = pad_x;
let padRightSide = pad_x + padWidth;
let padTopSide = pad_y;

// === кирпичи
let brickWidth = 75;
let brickHeight = 20;
let brick_x = 0;
let brick_y = 0;
let brickLife = 1;
let brickLeftSide = 0;
let brickRightSide = 0;
let brickBottomSide = 0;
let brickQty = 15;

// === кирпичное поле
let field = [];
let fieldRow = 3;
let fieldColumn = 5;
let gapWidth = 15;
let gapHeight = 15;
let fieldWidth = fieldColumn * brickWidth + (fieldColumn - 1) * gapWidth;
let marginTop = 30;
let marginLeft = (screenWidth - fieldWidth) / 2;

// заполнение массива
for (let row = 0; row < fieldRow; row++) {
  field[row] = [];
  for (let col = 0; col < fieldColumn; col++) {
    field[row][col] = { x: 0, y: 0, life: 1 };
  }
}

// игровые баллы
let score = 0;

// === флаг события - конец игры
let gameOver = false;
let youWin = false;

/**
 * Позволяет узнать длину строки в пикселях
 *
 * @deprecated <pre>
 * Данная функция работает только с конкретным моноширинным шрифтом
 * "Pixel Emulator"
 * </pre>
 * @param {string} string - некая строка
 * @param {number} fontSize - размер шрифта
 * @returns {number}
 */
const howStringWidthPX = (string, fontSize) => {
  let qtySymbols = string.length;
  // Посчитать количество символов
  let qtySpaces = qtySymbols - 1;
  // Посчитать количество межсимвольных отступов

  let widthSymbol = fontSize * 0.68;
  // Посчитать размер символа в пикселях
  let widthSpace = fontSize * 0.1;
  // Посчитать размер отступа в пикселях

  return qtySymbols * widthSymbol + qtySpaces * widthSpace;
  // Узнать длину строки в пикселях
};

// === отрисовка ракетки
/**
 * Рисует ракетку
 *
 */
const drawPad = () => {
  ctx.beginPath();
  ctx.rect(pad_x, pad_y, padWidth, padHeight);
  ctx.fillStyle = $canvasFigureBg;
  ctx.fill();
  ctx.closePath();
};

// === отрисовка мячика
/**
 * Рисует мячик
 *
 */
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball_x, ball_y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = $canvasFigureBg;
  ctx.fill();
  ctx.closePath();
};

// === отрисовка кирпичей
/**
 * Рисует кирпичи
 *
 * @deprecated <pre>
 * Заполняет живыми кирпичами массив (поле для кирпичей)
 * </pre>
 */
let drawBricks = () => {
  for (let row = 0; row < fieldRow; row++) {
    for (let col = 0; col < fieldColumn; col++) {
      if (field[row][col].life == 0) {
        continue;
      }
      field[row][col].x = brickWidth * col + gapWidth * col + marginLeft;
      field[row][col].y = brickHeight * row + gapHeight * row + marginTop;
      brick_x = field[row][col].x;
      brick_y = field[row][col].y;
      ctx.beginPath();
      ctx.rect(brick_x, brick_y, brickWidth, brickHeight);
      ctx.fillStyle = $canvasBrick;
      ctx.fill();
      ctx.closePath();
    }
  }
};

// === отрисовка надписи Game over
/**
 * Рисует надпись об окончании игры
 *
 * @deprecated <pre>
 * В случае победы надпись - 'You win!'
 * В случае проигрыша надпись - 'Game over'
 * </pre>
 */
let drawGameOver = () => {
  if (gameOver == true) {
    let string = '';
    if (youWin == true) {
      string = 'You win!';
    }
    if (youWin == false) {
      string = 'Game over';
    }
    let fontSize = 50;
    let stringLength = howStringWidthPX(string, fontSize);
    let string_x = screenWidth / 2 - stringLength / 2;
    let string_y = 100;

    ctx.fillStyle = $canvasText;
    ctx.font = `${fontSize}px PixelEmulator`;
    ctx.fillText(string, string_x, string_y);
    console.log(string);
    console.log(`количество кирпичей ${brickQty}`);
  }
};

// === вывод количества очков
/**
 * Выводит количество набранных очков
 *
 */
let drawScore = () => {
  let fontSize = 14;
  let string = `Score = ${score}`;
  let stringLength = howStringWidthPX(string, fontSize);
  let string_x = screenWidth - stringLength - 20;
  let string_y = 20;

  ctx.fillStyle = $canvasText;
  ctx.font = `${fontSize}px PixelEmulator`;
  ctx.fillText(string, string_x, string_y);
};

// === поиск столкновений
/**
 * Отпределяет столкновения мячика с кирпичами
 *
 * @deprecated <pre>
 * Если столкновение с кирпичом произошло, он помечается как неживой.
 * </pre>
 */
let whereWasCollision = () => {
  for (let row = 0; row < fieldRow; row++) {
    for (let col = 0; col < fieldColumn; col++) {
      brick_x = field[row][col].x;
      brick_y = field[row][col].y;
      brickLife = field[row][col].life;
      brickLeftSide = brick_x;
      brickRightSide = brick_x + brickWidth;
      brickBottomSide = brick_y + brickHeight;

      if (ball_y <= brickBottomSide) {
        if (
          ball_x >= brickLeftSide &&
          ball_x <= brickRightSide &&
          brickLife == 1
        ) {
          ball_dy = -ball_dy;
          field[row][col].life = 0;
          brickQty -= 1;
          score += 1;
        }
      }
    }
  }
};

/**
 * Перерисовывает игровой экран за каждый свой вызов
 *
 * @deprecated <pre>
 * Проверяет всю логику движения объектов на игровом поле:
 * - Смещение мячика за кадр
 * - Отскок от краев экрана
 * - Отскок от ракетки
 * - Отскок от кирпичей и их убийство
 * - Победу, поражение
 * - Движение ракетки
 * </pre>
 */
const draw = () => {
  // === очистка предыдущего кадра
  ctx.clearRect(screen_x, screen_y, screenWidth, screenHeight);

  // === смещение шарика за каждый кадр
  ball_x += ball_dx;
  ball_y += ball_dy;

  // === отскок от правой стенки
  if (ball_x + ballRadius > screenRightSide) {
    ball_dx = -ball_dx;
  }

  // === отскок от левой стенки
  if (ball_x - ballRadius < screenLeftSide) {
    ball_dx = -ball_dx;
  }

  // === отскок от верхней стенки
  if (ball_y - ballRadius < screenTopSide) {
    ball_dy = -ball_dy;
  }

  // === касание нижней стенки - Game over
  if (ball_y + ballRadius > screenBottomSide) {
    clearInterval(interval);
    console.log(`позиция мячика y=${ball_y}`);
    console.log(`позиция нижнего края экрана ${screenBottomSide}`);
    console.log(`позиция верхнего края доски ${padTopSide}`);
    console.log(`позиция мячика x=${ball_x}`);
    console.log(`позиция доски left=${padLeftSide} right=${padRightSide}`);
    gameOver = true;
  }

  // === закончились кирпичи - Game over
  if (brickQty == 0) {
    gameOver = true;
    youWin = true;
  }

  // === отбив ракеткой
  if (ball_y + ballRadius == padTopSide) {
    if (ball_x >= padLeftSide && ball_x <= padRightSide) {
      ball_dy = -ball_dy;
    }
  }

  // === перемещение ракетки влево
  if (leftArrowDown == true && padLeftSide >= screenLeftSide) {
    pad_x -= 2;
    padLeftSide -= 2;
    padRightSide -= 2;
  }

  // === перемещение ракетки вправо
  if (rightArrowDown == true && padRightSide <= screenRightSide) {
    pad_x += 2;
    padLeftSide += 2;
    padRightSide += 2;
  }

  // === чит
  if (cheat == true) {
    brickQty = 0;
  }

  // === отрисовка кадра
  drawPad();
  drawBricks();
  drawBall();
  whereWasCollision();
  drawScore();
  drawGameOver();
};

// === бинд клавиш =============================================================
// === флаг события - нажатие кнопок
let leftArrowDown = false;
let rightArrowDown = false;
let cheat = false;

// === нажатие кнопки
let keyDown = element => {
  if (element.code == 'ArrowLeft') {
    leftArrowDown = true;
  }
  if (element.code == 'ArrowRight') {
    rightArrowDown = true;
  }
  console.log(element);
  if (element.code == 'Numpad0') {
    cheat = true;
    console.log('Читер!');
  }
};

// === отпускание кнопки
let keyUp = element => {
  if (element.code == 'ArrowLeft') {
    leftArrowDown = false;
  }
  if (element.code == 'ArrowRight') {
    rightArrowDown = false;
  }
};

// === запуск нужных функций на нужные события
document.onkeydown = keyDown;
// кнопка нажата
document.onkeyup = keyUp;
// кнопка отпущена
// =============================================================================

// === запуск функции отрисовки в заданный интервал - скорость
let interval = setInterval(draw, 10);
