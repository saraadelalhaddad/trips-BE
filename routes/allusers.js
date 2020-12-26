const express = require("express");
const router = express.Router();
const { usersList } = require("../controllers/userController");

/*get list of users*/
router.get("/", usersList);

module.exports = router;
