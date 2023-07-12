const express = require("express");
const router = express.Router();

const user = require("./user/index");
const api = require("./api/index");
const setup = require("./setup");
const room = require("./room");
const handle_home = require("./handle_home");

router.use("/user", user);
router.use("/api", api);
router.use("/setup", setup);
router.use("/room", room);
router.use('/', handle_home);




module.exports = router;