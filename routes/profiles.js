const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  profileUpdate,
  profilesList,
  fetchProfile,
} = require("../controllers/profileController");

// userId from Param
router.param("userId", async (req, res, next, userId) => {
  console.log(`this is me ${userId}`);
  const profile = await fetchProfile(userId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("profile Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of profiles*/
router.get("/", profilesList);

/* Update profile*/
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
