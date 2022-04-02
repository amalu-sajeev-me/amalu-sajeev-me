import { overwriteDefault } from "./index.js";

const defaultOptions = {
  parentElem: null,
  children: [],
  html: null,
  attributes: {},
  click: null,
  styles: {},
};
const makeElement = function (
  element = "div",
  {
    parentElem = false,
    children = [],
    html = null,
    attributes = {},
    click = null,
    styles = {},
  } = defaultOptions
) {
  // create an HTMLElement
  const htmlElement = document.createElement(element);
  // set attributes for the HTMLElement
  for (let attr in attributes) htmlElement.setAttribute(attr, attributes[attr]);
  // set styles for the HTMLElement
  Object.assign(htmlElement.style, styles);
  // set innerHTML for HTMLElement
  if (html) htmlElement.innerHTML = html;
  // Append child Elements to HTMLElement
  for (let child of children) htmlElement.append(child);
  // if specified, append HTMLElement to the ParentElement
  if (parentElem) parentElem.append(htmlElement);
  // if specified, add click Handler to HTMLElement
  if (click) htmlElement.addEventListener("click", click);
  // helper method for eventListeners
  htmlElement.__proto__.on = function (event = "click", fn) {
    overwriteDefault(this, event, fn);
    return this;
  };
  // helper method for setting HTMLElement Attributes
  htmlElement.__proto__.addProps = function (props = {}) {
    if (typeof arguments[0] !== "object")
      this.setAttribute(arguments[0], arguments[1]);
    else for (let prop in props) this.setAttribute(prop, props[prop]);
    return this;
  };
  // htmlElement.style.color = "yellow";
  console.log(htmlElement.style.color);
  return htmlElement;
};

export { makeElement };
