const List = require("../models/listModel");

const getList = async (req, res) => {
  console.log(req.query)
  const userId = req.query.userId;
  try {
    const Lists = await List.findAll({where : {userId: userId}});
    res.status(200).json(Lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createList = async (req, res) => {
  console.log("i am called");
  const userId = req.params.userId;
  const maxId = await List.max("id");
  const listNumber = maxId ? maxId + 1 : 1;
  try {
    const newList = await List.create({ name: `List ${listNumber}`, userId: userId});
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListOne = async (req, res) => {
  // const userId = req.query.userId; // Retrieve userId from query parameters
  const listId = req.params.id;

  try {
    const list = await List.findOne({ where: { id: listId } });

    if (list) {
      res.json({ list });
    } else {
      res.status(404).json({ error: "List not found" });
    }
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteList = async (req, res) => {
  console.log("i am called");
  try {
    console.log(req.params.listId);
    const { listId } = req.params;
    await List.destroy({
      where: {
        id: listId,
      },
    });
    res.status(200).json({ message: "List successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getList,
  createList,
  deleteList,
  getListOne,
};
