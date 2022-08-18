const userService = require("../service/user.service");
const getUser = async (req, res) => {
  try {
    await userService.getUser();
    console.log('In User Controller');
    return res.status(400).send({
      success: false,
      data: 'Err',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  getUser,
};
