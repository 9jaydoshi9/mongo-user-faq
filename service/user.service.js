const getUser = async () => {
  try {
    console.log('User Service');
    return {
      status: true,
      data: {},
    };
  } catch (err) {
    return {
      status: false,
      data: err,
    };
  }
};


module.exports = { getUser };
