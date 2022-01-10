const express = require('express')

// controllers

const {
    allTodos,
    oneTodo,
    updateTodo,
    deleteTodo,
    createTodo,
} = require('../controllers/todos.controller')

const router = express.Router()

router.route('/').get(allTodos).post(createTodo)
router.route('/:id').get(oneTodo).put(updateTodo).delete(deleteTodo)

module.exports = { todosRouter: router}