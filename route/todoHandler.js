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

// put todo by id

router.put("/todos/:id", async (req, res) => {

})

// delete todo by id

router.delete("/todos/:id", async (req, res) => {

})

module.exports = router;