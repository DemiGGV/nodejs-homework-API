const ctrlWrap = (ctrl) => {
  const foo = async (req, resp, next) => {
    try {
      await ctrl(req, resp, next);
    } catch (error) {
      next(error);
    }
  };
  return foo;
};

module.exports = ctrlWrap;
