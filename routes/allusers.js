const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  usersList,
  userUpdate,
  fetchUser,
} = require("../controllers/userController");

//userpId from Param
// router.param("userId", async (req, res, next, userId) => {
//   console.log(`this is me user ${userId}`);
//   const user = await fetchUser(userId, next);
//   console.log("TCL: user", user);

//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     const err = new Error("error Not Found");
//     err.status = 404;
//     next(err);
//   }
// });

/*get list of users*/
router.get("/", usersList);

/* Update user*/
router.put("/", passport.authenticate("jwt", { session: false }), userUpdate);

module.exports = router;
