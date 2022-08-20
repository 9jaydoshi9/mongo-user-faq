const User = require("../model/users");
const { randomThreeDigits, generateHash, compareHash, generateToken } = require("../util/util");

const createUser = async (createUserDto) => {
  try {
    const hashedPassword = await generateHash(createUserDto.password);
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
      recentPasswords: [hashedPassword],
      pin: await getUniquePin(),
    };

    const userDetails = await new User(newUser).save();
    
    const token = generateToken({id: userDetails?._id});
    return {
      success: true,
      data: {
        accessToken: token,
        message: 'Created Successfully.'
      },
    };
    // send email after user is created successfully
  } catch (err) {
    return {
      success: false,
      data: { message: "Invalid Input Please Try Again." },
    };
  }
};

const userLogin = async (loginDto) => {
  try {
    const userDetails = await User.findOne({
      email: loginDto.email,
    },'_id password');

    if (!userDetails) {
      return {
        success: false,
        data: { message: "User not found for given email." },
      };
    }

    const isValidPwd = await compareHash(loginDto.password, userDetails?.password);
    if (!isValidPwd) {
      return {
        success: false,
        data: { message: "Invalid credentials." },
      };
    }

    const token = generateToken({ id: userDetails?._id });
    return {
      success: true,
      data: {
        accessToken: token,
        message: "Login Successfully.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: { message: "Internal Server Error." },
    };
  }
};

const changePassword = async (user, changePasswordDto) => {
  try {
    const { currentPassword, newPassword } = changePasswordDto;

    const userDetails = await User.findOne({
      _id: user.id,
    },'_id password recentPasswords');

    if (!userDetails) {
      return {
        success: false,
        data: { message: "User not found." },
      };
    }

    const isValidPwd = await compareHash(currentPassword, userDetails?.password);
    if (!isValidPwd) {
      return {
        success: false,
        data: { message: "Invalid credentials." },
      };
    }

    let isRecentPassword = false;
    for (let pwd of userDetails.recentPasswords) {
      if (await compareHash(newPassword, pwd)) {
        isRecentPassword = true;
        break;
      }
    }
    if (isRecentPassword) {
      // give error that it is recently used
      return {
        success: false,
        data: { message: "You cannot use your last 3 passwords." },
      };
    } else {
      // allow to change the password and save it as one of the recent passwords - max 3
      const hashedPassword = await generateHash(newPassword);

      userDetails.password = hashedPassword;
      if (userDetails?.recentPasswords?.length === 3) {
        // only save last 3 passwords
        userDetails.recentPasswords.shift();
      }
      userDetails.recentPasswords = [...userDetails.recentPasswords, hashedPassword];
      await userDetails.save();
    }

    return {
      success: true,
      data: {
        message: "Password Changed Successfully.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: { message: "Internal Server Error." },
    };
  }
};


const getUser = async (user) => {
  try {
    if (!user) {
      throw new Error("User Not Found");
    }
    return {
      success: true,
      data: await User.findById(user.id,'_id name pin email'),
    };
  } catch (err) {
    return {
      success: false,
      data: "Bad Request",
    };
  }
};

const getUniquePin = async () => {
  // get a random pin
  let pin = "";
  let isPinUnique = false;
  while (!isPinUnique) {
    pin = randomThreeDigits();
    // check is pin exist
    const user = await User.findOne({
      pin,
    });

    if (user) {
      continue;
    }
    // return unique pin
    isPinUnique = true;
  }
  return pin;
};

module.exports = { getUser, createUser, userLogin, changePassword };
