const JWT = require("jsonwebtoken");
const secret = "$Blog#@12";

function createTokenForUser(user) {
  const payLoad = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payLoad, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
