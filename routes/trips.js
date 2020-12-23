const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");
const {
  tripList,
  tripCreate,
  tripUpdate,
  tripDelete,
  fetchTrip,
} = require("../controllers/tripController");

// tripId from Param
router.param("tripId", async (req, res, next, tripId) => {
  console.log(`this is me ${tripId}`);
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("trip Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of trips*/
router.get("/", tripList);

/* create trip*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);
/* Update trip*/
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);

/* delete item*/
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
