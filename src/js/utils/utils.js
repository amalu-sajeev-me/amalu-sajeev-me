const isRequired = (param = false) => {
  const errorMessage = param ? param : "";
  throw new Error(`${errorMessage} parameter missing.`);
};

const overwriteDefault = (element, eventType, fn, preventDefault = true) => {
  element.addEventListener(eventType, (event) => {
    preventDefault && event.preventDefault();
    fn(event);
  });
  return element;
};

export { isRequired, overwriteDefault };
