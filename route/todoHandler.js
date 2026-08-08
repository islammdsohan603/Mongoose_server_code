const express = require('express');

const router = express.Router();
const Todo = require('../schema/todoSchema');


// get all todos

router.get("/todos", async (req, res) => {


})

// create a todo by id

router.get("/todos/:id", async (req, res) => [

])

// post a todo

// POST a todo
router.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);

    if (!newTodo.title || !newTodo.description || !newTodo.status) {
      return res.status(400).json({
        message: "Title, description and status are required",
      });
    }

    await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// post multiple todos

router.post("/todos/all", async (req, res) => {

  try {

    const newTodos = await Todo.insertMany(req.body);

    if (!newTodos) {
      return res.status(400).json({
        message: "Todos not created",
      });
    }

    res.status(201).json({
      message: "Todos created successfully",
      todos: newTodos,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }

})



// PUT todo by ID
router.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Todo খুঁজে পাওয়া যায়নি
    if (updatedTodo.matchedCount === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Todo পাওয়া গেছে কিন্তু কোনো data change হয়নি
    if (updatedTodo.modifiedCount === 0) {
      return res.status(200).json({
        message: "No changes made",
        todo: updatedTodo,
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// delete todo by id

router.delete("/todos/:id", async (req, res) => {

})

module.exports = router;