const express = require("express");
const router = express.Router();

const sign_in = require("./sign_in");

router.get("/sign_in", sign_in);

module.exports = router;