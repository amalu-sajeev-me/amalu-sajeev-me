function fillWithElements(id, data, options) {
  const target = document.getElementById(id);

  const defaultOptions = {
    wrapper: ["div", {}],
    className: "empty",
    html: (val) => val,
  };

  Object.assign(defaultOptions, options);

  const {
    wrapper: [htmlElement, props],
    className,
    html,
  } = defaultOptions;
  data
    .map((elem, index, elements) => {
      let div = document.createElement(htmlElement);
      let attributes = typeof props === "function" ? props(elem) : props;
      if (Object.entries(attributes).length > 0) {
        for (let attr in attributes) div.setAttribute(attr, attributes[attr]);
      }
      className && div.classList.add(className);
      div.classList.add("tiles");
      div.innerHTML = html(elem, elements);
      return div;
    })
    .forEach((elem) => target.append(elem));
  return target;
}

export { fillWithElements };
