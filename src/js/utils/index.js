const isRequired = (param) => {
  throw new Error(`${param} parameter missing.`);
};

export { isRequired };
