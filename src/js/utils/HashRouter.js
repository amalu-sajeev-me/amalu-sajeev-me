import { makeElement, onEvent } from "./index.js";

class HashRouter extends EventTarget {
  static supportedEvents = {
    newRoute: new CustomEvent("newRoute"),
    open: new CustomEvent("onopen"),
  };
  static #targetElemStyles = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    border: "none",
    padding: "0",
    overflow: "scroll",
  };

  static #targetElemOpts = {
    parentElem: document.body,
    styles: HashRouter.#targetElemStyles,
    attributes: { id: "dialog_wrapper" },
  };

  static availableRouters = [];

  static targetElement = makeElement("dialog", HashRouter.#targetElemOpts);

  static initialize() {
    const showRoute = ({ target }) => {
      const { hash } = target.location;
      const path = hash.slice(1);
      const validRouter = HashRouter.isPathAvailable(path);
      if (validRouter) validRouter.open(path);
      else HashRouter.close();
    };
    onEvent(window, "hashchange", showRoute);
    onEvent(window, "load", showRoute);
  }

  static isPathAvailable(path) {
    const { availableRouters } = HashRouter;
    for (let router of availableRouters)
      if (path in router.availableRoutes) return router;
    return false;
  }

  static makeNew(name) {
    return new HashRouter(name);
  }

  static close() {
    HashRouter.targetElement.close();
    HashRouter.innerHTML = "";
  }
  #routes = {};

  // CONSTRUCTOR ====================================>

  constructor(name) {
    super(name);
    this.name = name;
    HashRouter.availableRouters.push(this);
  }

  route(path, data) {
    // const verifyData = typeof data === "string" || data instanceof HTMLElement;
    // if (!verifyData) throw new TypeError("invalid html input data type");

    const verifyData =
      ["string", "function"].includes(typeof data) ||
      data instanceof HTMLElement;
    if (!verifyData) throw new TypeError("invalid html input data type");

    const htmlData =
      typeof data === "function"
        ? data(makeElement) instanceof HTMLElement
          ? data(makeElement).outerHTML
          : data(makeElement)
        : data instanceof HTMLElement
        ? data.outerHTML
        : data;
    this.#routes[path] = htmlData;
    this.dispatchEvent(HashRouter.supportedEvents.newRoute);
    return this;
  }

  open(path) {
    if (!(path in this.#routes)) throw new Error("unknown route");
    HashRouter.targetElement.innerHTML = this.#routes[path];
    HashRouter.targetElement.open = true;
    this.dispatchEvent(HashRouter.supportedEvents.open);
    return this;
  }

  get availableRoutes() {
    return this.#routes;
  }
}

export { HashRouter };
