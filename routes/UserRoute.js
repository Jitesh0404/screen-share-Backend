const express = require("express");

const { loginRegister } = require("../controllers/UserController");
const router = express.Router();


router.post("/loginRegister",loginRegister)


module.exports = router;