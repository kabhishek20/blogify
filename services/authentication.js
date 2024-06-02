const JwT = require('jsonwebtoken');
// const { removeListener } = require('../models/User');
const SECRET_KEY = 'DELLinspiron@3593'

function createTokenForUser(user){
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    fullName: user.fullName
  }

  const token = JwT.sign(payload, SECRET_KEY);

  return token;
}

function validateToken(token){
  const payload = JwT.verify(token, SECRET_KEY)
  return payload;
}


module.exports = {
  createTokenForUser,
  validateToken
}