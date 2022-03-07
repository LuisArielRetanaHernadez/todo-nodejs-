// model
const { Todo } = require('../models/todo.model')


// utils
const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

exports.allTodos = catchAsync(async (req, res, next) => {

    const todos = await Todo.findAll({
        where: { status: 'pending'}
    })
    res.status(200).json({
        status: 'success',
        data: { todos }
    })
})
exports.oneTodo = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const todo = await Todo.findOne({ where: { id } })

    if(!todo) {return next(new AppError('tarea no encontrada'), 404)};

    res.status(202).json({
        status: 'success',
        data: { todo }
    })

})
exports.updateTodo = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { content } = req.body 

    const todo = await Todo.findOne({ where: { id }})

    if(!todo && content) {return next(new AppError('error al actualizar tarea'),404)}

    await todo.update({ content })

    res.status(202).json({
        status: 'success',
    })
})
exports.deleteTodo = catchAsync(async (req, res, next) => {
    const { id } = req.params
    
    const todo = await Todo.findOne({where: { id }})

    if(!todo) {return next(new AppError('tarea no encotrada'),404)}

    await todo.destroy()

    res.status(204).json({
        status: 'success',
        Message: 'delete todo',
    })

})
exports.createTodo = catchAsync(async (req, res, next) => {
    const {content} = req.body

    const newTodo = await Todo.create({content})

    console.log('create todo: ', newTodo)

    res.status(201).json({
        message: 'success',
        data: newTodo
    })
})