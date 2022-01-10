const express = require('express')
const cors = require('cors')

// router
const { todosRouter } = require('./routes/todos.router')

// controllers
const { globalError } = require('./controllers/error.controller')

// init app
const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.use('*', cors())

// endpoints
app.use('/api/v1/todos', todosRouter)
app.use(globalError)

module.exports = {app}