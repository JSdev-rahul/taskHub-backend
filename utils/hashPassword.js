const bcrypt = require("bcrypt");

const bcryptSalt = bcrypt.genSaltSync(10);

const hashedPassword = (password) => {
  const Hpassword = bcrypt.hashSync(password, bcryptSalt);
  return Hpassword;
};

module.exports = hashedPassword;
