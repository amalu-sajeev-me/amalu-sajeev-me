import { makeElement, onEvent } from "./index.js";

class HashRouter extends EventTarget {
  static supportedEvents = ["route", "open"];
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
    styles: this.#targetElemStyles,
    attributes: { id: "dialog_wrapper" },
  };

  static availableRouters = [];

  static targetElement = makeElement("dialog", HashRouter.#targetElemOpts);

  static initialize() {
    const showRoute = ({ target }) => {
      const { hash } = target.location;
      const path = hash.slice(1);
      const validRouter = this.isPathAvailable(path);
      if (validRouter) validRouter.open(path);
      else this.close();
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

  static close() {
    this.targetElement.close();
    this.targetElement.innerHTML = "";
  }

  static makeNew(name) {
    return new HashRouter(name);
  }
  static {
    this.makeNew.__proto__.initialize = this.initialize.bind(HashRouter);
  }
  #routes = {};

  // CONSTRUCTOR ====================================>

  constructor(name) {
    super(name);
    this.name = name;
    this.route = this.route.bind(this);
    this.on = this.addEventListener.bind(this);
    HashRouter.availableRouters.push(this);
  }

  route(path, data) {
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
    const demoEvent = new Event("");
    const routeEvent = new CustomEvent("route", { detail: { name: "amalu" } });
    this.dispatchEvent(routeEvent);
    return this;
  }

  open(path) {
    if (!(path in this.#routes)) throw new Error("unknown route");
    HashRouter.targetElement.innerHTML = this.#routes[path];
    HashRouter.targetElement.open = true;
    const detail = {
      url: new URL(location.href),
      router: this.name,
    };
    const openEvent = new CustomEvent("open", { detail });
    this.dispatchEvent(openEvent);
    return this;
  }

  get availableRoutes() {
    return this.#routes;
  }
}

const { makeNew } = HashRouter;

export { makeNew as HashRouter };
