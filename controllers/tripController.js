const { Trip, User } = require("../db/models");

//fetch a trip
exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

/*get list of trips*/
exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: ["id", "title", "image", "slug"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["fname"],
        },
      ],
    });
    console.log("Trips", trips);
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

/* create trip*/
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};

/* Update trip*/
exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.trip.update(req.body);
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

/* delete trip*/
exports.tripDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.userId) {
      await req.trip.destroy();
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
