module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Profile;
};
