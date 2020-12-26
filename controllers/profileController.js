const { Profile, User } = require("../db/models");

//fetch a profile
exports.fetchProfile = async (userId, next) => {
  try {
    const profile = await Profile.findOne({ where: { userId: userId } });
    return profile;
  } catch (error) {
    next(error);
  }
};

/*get list of profiles*/
exports.profilesList = async (req, res, next) => {
  try {
    console.log("Here profiles");
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["firstName", "lastName", "email"],
      //   },
      // ],
    });
    console.log("profiles", profiles);
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

/*update a profile*/
exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.profile.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
