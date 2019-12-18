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

const draw = () => {

}
setInterval(draw, 10);


// canvas ============================================================
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(50, 50, 10, 0, Math.PI * 2, false);
ctx.fillStyle = '#d8ad4d';
ctx.fill();
ctx.closePath();
