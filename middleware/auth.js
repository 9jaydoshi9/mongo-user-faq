const jwt = require("jsonwebtoken");
const { HttpStatus } = require("../util/statusCodes.constant");

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      throw new Error("Unauthorized Request");
    }

    const decoded = jwt.verify(token, process.env.JWTSECRET || "SECRET");
    req.user = decoded;
    
    return next();
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      success: false,
      data: {
        message: "Unauthorized Request",
      },
    });
  }
};

module.exports = { auth };
