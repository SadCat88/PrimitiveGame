export /**
 * Позволяет получить из DOM значение свойства content: ' ' у псевдоэлемента
 * @deprecated <pre><code>
 * Данная функция необходима для передачи значений переменных объявленных в SCSS через HTML в JS.<br>
 *
 * В HTML необходимо создать список вида:
 * < ul>
 *    < li id="mainColor">< /li>
 * < /ul>
 * Элементы списка в значении id должны содержать название переменной
 * Данный список рекомендуется скрывать свойством display: none;
 *
 * В SCSS можно создать любую переменную и передать ее псевдоэлементом в HTML:
 * $mainColor: #600c65;
 * #mainColor::after {
 *     content: '#{$mainColor}';
 * }
 *
 * В JS можно получить значение свойства content: ' ' следующим образом:
 * let $mainColor = getAfterContent("#mainColor");
 *
 * <b>Зачем???</b>
 * Возникла необходимость определить цвета в SCSS, а потом этими цветами рисовать в canvas.
 * Таким образом возможно быстро менять стилистику всей страницы снаружи и внутри canvas,
 * поменяв значения переменных в одном файле.
 * </code></pre>
 * @param {string} id - строка вида '#id', которая является id нужного элемента в DOM<br>
 * @returns {string} - содержимое свойства content: ' '<br>
 */

const getAfterContent = id => {
  let content = window.getComputedStyle(document.querySelector(id), ':after')
    .content;
  // найти элемент по id, выбрать его псевдоэлемент :after, после чего считать у него content: ''
  return content.replace(/"/g, '');
  // удалить у строки лишние двойные кавычки
};