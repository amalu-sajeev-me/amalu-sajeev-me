const isRequired = (param) => {
  throw new Error(`${param} parameter missing.`);
};

const makeElement = function (element = "div", options = {}) {
  const defaultOptions = {
    parentElem: false,
    children: [],
    html: null,
    attributes: {},
    click: null,
    styles: {},
  };
  Object.assign(defaultOptions, options);
  const { parentElem, children, html, attributes, click, styles } =
    defaultOptions;
  const htmlElement = document.createElement(element);
  for (let attr in attributes) htmlElement.setAttribute(attr, attributes[attr]);
  Object.assign(htmlElement.style, styles);

  if (html) htmlElement.innerHTML = html;
  for (let child of children) htmlElement.append(child);
  if (parentElem) parentElem.append(htmlElement);
  if (click) htmlElement.addEventListener("click", click);
  console.log(click);
  return htmlElement;
};

const overwriteDefault = (element, type, fn, preventDefault = true) => {
  element.addEventListener(type, (event) => {
    if (preventDefault) event.preventDefault();
    fn(event);
  });
  return element;
};

export { isRequired, makeElement, overwriteDefault };
