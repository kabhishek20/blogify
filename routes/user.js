const express = require("express");
const router = express.Router();

const { handlesignin, handlesignup } = require("../controllers/user");

router
  .route("/signin")
  .get((req, res) => {
    return res.render("signin");
  })
  .post(handlesignin);


router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(handlesignup);

router.route("/signout")
  .get((req, res) => {
    res.clearCookie("token");
    return res.redirect("/");
  });

module.exports = router;
