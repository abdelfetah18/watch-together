const express = require("express");
const router = express.Router();

const updateToken = require("./update_token");

router.use("/update_token", updateToken);

module.exports = router;