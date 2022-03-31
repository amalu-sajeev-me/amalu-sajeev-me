import { isRequired, makeElement, overwriteDefault } from "./utils/index.js";

class Router {
  static routeList = [];
  constructor(selector = isRequired("selector"), elements = null) {
    const dialog = makeElement(`dialog`, {
      parentElem: document.body,
      attributes: { id: selector },
    });

    this.target = dialog;
    this.routes = {};
    this.elements = elements || document.querySelectorAll(`a.${selector}`);
    if (this.elements) {
      this.elements.forEach((element) => {
        this.addRoute(element.href, null);
        overwriteDefault(element, `click`, (event) => {
          const { hash: path } = new URL(event.currentTarget.href);
          console.log(path);
          this.go(path.slice(1));
        });
      });
    }
    Router.routeList.push(this);
  }
  addRoute(url = isRequired("url"), data = null) {
    const link = new URL(url).hash.slice(1);
    this.routes[link] = data;
  }
  setRoute(path, data) {
    const htmlData = typeof data === "function" ? data() : data;
    if (path in this.routes) this.routes[path] = htmlData;
    else throw new Error("no such route");
    return this;
  }
  go(path) {
    const self = this;
    const { target, routes, close } = self;
    if (path in this.routes) {
      if (target.open === true || !routes[path]) return false;
      else target.open = true;

      const wrapper = makeElement("div", {
        parentElem: target,
        children: [
          makeElement(),
          makeElement("button", {
            html: `close`,
            click: () => close(),
          }),
          makeElement("div", {
            html: routes[path],
          }),
        ],
        attributes: {
          id: `dialog_wrapper`,
        },
      });
    }
  }
  close() {
    const wrapper = document.getElementById("dialog_wrapper");
    wrapper.parentElement.close();
    wrapper.remove();
  }
}

export { Router };
