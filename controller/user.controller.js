const userService = require("../service/user.service");
const { createUserValidate, loginValidation, changePasswordValidation } = require("../validation/user.validation");
const { HttpStatus } = require('../util/statusCodes.constant');

const getUser = async (req, res) => {
  try {
    const { success, data } = await userService.getUser(req?.user);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    // add validation for the request
    const valid = createUserValidate.validate(req.body);
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });      
    }

    const { success, data} = await userService.createUser(req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.CREATED).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    // validate login request
    const valid = loginValidation.validate(req.body);
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await userService.userLogin(req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // validate change password request
    const valid = changePasswordValidation.validate(req.body);
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await userService.changePassword(req.user, req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  getUser,
  createUser,
  userLogin,
  changePassword,
};
