const isRequired = (param = false) => {
  const errorMessage = param ? param : "";
  throw new Error(`${errorMessage} parameter missing.`);
};

const onEvent = (element, eventType, fn = null, preventDefault = true) => {
  element.addEventListener(eventType, (event) => {
    preventDefault && event.preventDefault();
    if (fn) fn(event);
  });
  return element;
};

export { isRequired, onEvent };
