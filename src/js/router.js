import { isRequired } from "./utils/index.js";

class Router {
  constructor(selector = isRequired("selector")) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", selector);
    document.body.append(dialog);
    this.target = dialog;
    this.routes = {};
    this.elements = document.querySelectorAll(`.${selector}`);
    if (this.elements.length > 0) {
      this.elements.forEach((element) => {
        this.addRoute(element.href, null);
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const { hash: path } = new URL(event.currentTarget.href);
          this.go(path.slice(1));
        });
      });
    }
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
    if (path in this.routes) {
      if (this.target.open === true) return false;
      else this.target.open = true;
      const wrapper = document.createElement("div");
      const title = document.createElement("div");
      const button = document.createElement("button");
      const body = document.createElement("div");
      button.textContent = `close`;
      button.onclick = () => {
        this.close();
      };
      wrapper.setAttribute("id", "dialog_wrapper");
      wrapper.append(title, body, button);
      body.innerHTML = this.routes[path];
      this.target.append(wrapper);
    }
  }
  close() {
    const wrapper = document.getElementById("dialog_wrapper");
    this.target.close();
    wrapper.remove();
  }
}

export { Router };
