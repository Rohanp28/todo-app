require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Todo = require("./models/Todo");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Get a single todo by ID
app.get("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Create a new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { text, completed = false } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Todo text is required" });
    }

    const newTodo = new Todo({
      text: text.trim(),
      completed,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Update a todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updateData = { updatedAt: Date.now() };

    if (text !== undefined) {
      updateData.text = text.trim();
    }
    if (completed !== undefined) {
      updateData.completed = completed;
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Delete all completed todos
app.delete("/api/todos", async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({
      message: "Completed todos deleted successfully",
      count: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete completed todos" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
