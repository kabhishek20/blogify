const User = require("../models/User");
const { createTokenForUser } = require("../services/authentication");
const { strongPassword } = require("../services/strongPassword");

async function handlesignin(req, res){
  try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
          return res.render('signup',{
            error: "User doesn't exist. Please sign up first.",
          });
      }

      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        const token = createTokenForUser(user)
          return res.cookie('token',token).redirect('/');
      } else {
          return res.render('signin',{
            error: "Password Incorrect. Please try again.",
          });
      }
  } catch (err) {
      return res.render('signin',{
        error: 'Invalid Email or Password'
      });
  }
}

async function handlesignup(req, res){

  if (await User.findOne({ email: req.body.email })) {
    return res.render('signin',{
      error: "Email already registered! Please sign in.",
    });
  }

  if(!strongPassword(req.body.password)){
    return res.render('signup',{
      error: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
    });
  }

  // Create a new user
  await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  return res.redirect("/user/signin");
}

module.exports = {
  handlesignin,
  handlesignup
}