const express = require("express");
const router = express.Router();

const listController = require("../controllers/lists");

router.get("/", listController.getListItems)

module.exports = router;
