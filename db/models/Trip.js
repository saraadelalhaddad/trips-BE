const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  // We don't need a slug for the trip.
  SequelizeSlugify.slugifyModel(Trip, {
    source: ["title"],
  });
  return Trip;
};
