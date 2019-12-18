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

// ================================================================== index.js
('use strict');

// variables color ==================================================
let $pageBgColor = window.getComputedStyle(
  document.querySelector('#pageBgColor'),
  ':after'
).content;
let $canvasBgColor = window.getComputedStyle(
  document.querySelector('#canvasBgColor'),
  ':after'
).content;
let $panelBgColor = window.getComputedStyle(
  document.querySelector('#panelBgColor'),
  ':after'
).content;
let $canvasFigureBg = getAfterContent('#canvasFigureBg');

console.log($pageBgColor);
console.log($canvasBgColor);
console.log($panelBgColor);
console.log($canvasFigureBg);

// canvas ============================================================
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// === определение стартовой позиции мячика
// относительно размеров игрового поля
let x = canvas.width / 2;
let y = canvas.height - 30;

// === шаг движения за кадр
let dx = 1;
let dy = -1;

// === радиус шара
let ballRadius = 10;

// === ракетка
let padHeight = 10;
let padWidth = 75;
let padX = canvas.width / 2;

// отрисовка ракетки
const drawPad = () => {
  ctx.beginPath();
  ctx.rect(padX - padWidth / 2, canvas.height - padHeight, padWidth, padHeight);
  ctx.fillStyle = $canvasFigureBg;
  ctx.fill();
  ctx.closePath();
};

// отрисовка шарика
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = $canvasFigureBg;
  ctx.fill();
  ctx.closePath();
};

/**
 * Отрисовывает 1 кадр движения шарика за каждый свой вызов
 *
 * @deprecated
 * Учитывает столкновения и меняет траекторию
 */
const draw = () => {
  // очистка предыдущего кадра
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // смещение шарика за каждый кадр
  x += dx;
  y += dy;

  // отскок от правой стенки
  if (x + ballRadius > canvas.width) {
    dx = -dx;
  }

  // отскок от левой стенки
  if (x - ballRadius < 0) {
    dx = -dx;
  }

  // отскок от верхней стенки
  if (y - ballRadius < 0) {
    dy = -dy;
  }

  // отскок от нижней стенки
  if (y + ballRadius > canvas.height) {
    dy = -dy;
  }

  // перемещение ракетки влево
  if (leftDown == true && padX >= 0 + padWidth / 2) {
    padX -= 2;
  }

  // перемещение ракетки вправо
  if (rightDown == true && padX <= canvas.width - padWidth / 2) {
    padX += 2;
  }

  // отрисовка кадра
  drawBall();
  drawPad();
};

// бинд клавиш ===================================
let leftDown = false;
let rightDown = false;

let keyDown = element => {
  if (element.key == 'ArrowLeft') {
    leftDown = true;
  }
  if (element.key == 'ArrowRight') {
    rightDown = true;
  }
};
let keyUp = element => {
  if (element.key == 'ArrowLeft') {
    leftDown = false;
  }
  if (element.key == 'ArrowRight') {
    rightDown = false;
  }
};

document.onkeydown = keyDown;
document.onkeyup = keyUp;
// ================================================

setInterval(draw, 10);
// запуск функции отрисовки в заданный интервал - скорость
