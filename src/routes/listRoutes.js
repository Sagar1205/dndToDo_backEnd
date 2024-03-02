const express = require("express");
const router = express.Router();
const {
  getList,
  createList,
  deleteList,
  getListOne,
} = require("../controllers/listController");

router.get("/", (req, res) => {
  res.send("This is the server running of todoList Application using postgre");
});

router.post("/newList/:userId", createList);

router.get("/getList", getList);

router.get("/getListOne/:id", getListOne);

router.delete("/deleteList/:listId", deleteList);

module.exports = router;
