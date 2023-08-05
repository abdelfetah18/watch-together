const express = require("express");
const router = express.Router();

const user = require("./user");
const room = require("./room");
const auth = require("./auth");

router.use("/user", user);
router.use("/room", room);
router.use("/auth", auth);

module.exports = router;