const auth = async (req, res, next) => {
  console.log("In Middle");
  return next();
};

module.exports = { auth };
