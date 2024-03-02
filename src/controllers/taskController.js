const Task = require("../models/taskModel");

const getTask = async (req, res) => {
  // console.log(req.params)
  const listId = req.params.listId;
  const userId = req.query.userId;
  try {
    const Tasks = await Task.findAll({
      where: {
        listId: listId,
        userId: userId,
      },
    });
    res.status(200).json(Tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createTask = async (req, res) => {
  // console.log(req.body)
  try {
    // console.log("Once I got here")
    const { task, done, listId, userId } = req.body;
    const newTask = await Task.create({ task: task, done: done, listId: listId, userId: userId});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  console.log(req.body)
  try {
    const taskId = req.body.id;
    const updatedTask = req.body.task;
    const done = req.body.done;
    const listId = req.body.listId;
    const result = await Task.update(
      {
        id: taskId,
        task: updatedTask,
        done: done,
        listId: listId,
      },
      {
        where: {
          id: taskId,
        },
      }
    );

    // console.log(result)

    if (result > 0) {
      console.log("Update successful:", result);
      res.json({ success: true });
    } else {
      console.error("Error updating todo: Task not found");
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskOne = async (req, res) => {
  // const userId = req.query.userId; // Retrieve userId from query parameters
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ where: { id: taskId} });

    if (task) {
      res.json({ task });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  console.log("i am called");
  try {
    console.log(req.params.taskId)
    const { taskId } = req.params;
    await Task.destroy({
      where: {
        id: taskId,
      },
    });
    res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getTaskOne
};
