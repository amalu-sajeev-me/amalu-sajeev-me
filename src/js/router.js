import { isRequired, makeElement, overwriteDefault } from "./utils/index.js";

class Router {
  static routeList = [];
  static initialize() {
    const goTo = (closePrev = false) => {
      const hash = window.location.hash.slice(1);
      const { routeList } = Router;
      routeList.forEach((router) => {
        if (hash in router.routes) {
          if (closePrev) router.close(router.target.id);
          router.go(hash);
        }
      });
    };
    window.addEventListener("load", goTo);
    window.addEventListener("hashchange", goTo);
  }
  constructor(selector = isRequired("selector"), elements = null) {
    // Router.initialize();
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
      const titleBar = makeElement("div");
      const closeButton = makeElement("button", { html: "close" });
      closeButton.on("click", () => close(this.target.id));
      const contentBody = makeElement("div", { html: routes[path] });
      // wrapper
      makeElement("div", {
        parentElem: target,
        children: [titleBar, closeButton, contentBody],
      }).addProps("class", "dialog_wrapper");
      return this;
    }
    return false;
  }
  close(id = null) {
    if (id) {
      const target = document.getElementById(id);
      if (!target.open) return false;
      const selector = `#${id} > .dialog_wrapper`;
      const wrapper = document.querySelector(selector);
      target.removeChild(wrapper);
      target.close();
    }
  }
}

export { Router };
