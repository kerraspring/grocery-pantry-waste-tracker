const express = require("express");
const router = express.Router();

router.use(express.json());

const listController = require("../controllers/lists");

router.get("/", listController.getListItems)
router.post("/", listController.addNewItem)
router.put("/", listController.updateItem)
router.delete("/", listController.deleteItem);

module.exports = router;
