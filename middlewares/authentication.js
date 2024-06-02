const { validateToken } = require("../services/authentication");


const checkAuthentication = (cookieName) => {
  return (req,res,next) => {
    const token = req.cookies[cookieName];
    // console.log(token);
    if(!token){
      return next();
    }
    try{
      const user = validateToken(token);
      req.user = user;
    }
    catch{}
    next();
  }
}

module.exports = {
  checkAuthentication
}