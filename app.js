const express = require("express");

const cors = require("cors");
const db = require("./db/models");
const passport = require("passport");
const bodyParser = require("body-parser");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");
const path = require("path");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoutes);

// Remove this route. Are you using it?
app.get("/users", (req, res) => {
  res.json(users);
});
app.use("/trips", tripRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
