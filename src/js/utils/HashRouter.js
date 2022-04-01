import { makeElement, overwriteDefault } from "./index.js";

class HashRouter {
  static #targetElemStyles = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    border: "none",
    padding: "1em",
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
    };
    overwriteDefault(window, "hashchange", showRoute);
    overwriteDefault(window, "load", showRoute);
  }
  static isPathAvailable(path) {
    const { availableRouters } = HashRouter;
    for (let router of availableRouters)
      if (path in router.availableRoutes) return router;
    return false;
  }
  #routes = {};
  constructor(name, { selector = null } = {}) {
    this.name = name;

    HashRouter.availableRouters.push(this);
  }

  route(path, data) {
    this.#routes[path] = data;
    return this;
  }

  open(path) {
    if (!(path in this.#routes)) throw new Error("unknown route");
    HashRouter.targetElement.innerHTML = this.#routes[path];
    HashRouter.targetElement.open = true;
    return this;
  }

  close() {
    HashRouter.targetElement.close();
    HashRouter.innerHTML = "";
  }
  get availableRoutes() {
    return this.#routes;
  }
}


export { HashRouter };