const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");
const {body, validationResult} = require("express-validator");

// ADD TASK
router.post("/add", fetchUser,[
  body("title","Task title cannot be empty").trim().notEmpty()
] ,async (req, res) => {

  // checking the validations
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }
  try {
    const { title } = req.body;

    const task = new Task({
      title,
      user: req.user.id,
    });

    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).send("server error");
  }
});

/// GET TASKS
router.get("/get", fetchUser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// UPDATE TASKS
router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    const { title, completed } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    //security check
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updates = {}
    if(title !== undefined) updates.title = title;
    if(completed !== undefined) updates.completed = completed;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true },
    );

    res.json(task);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// DELETE TASK
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ succes: true , message:"Task deleted"});
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
