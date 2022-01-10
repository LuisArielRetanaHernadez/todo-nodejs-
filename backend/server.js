
// utils
const { bd } = require('./utils/database')

// express app
const { app } = require('./app')


bd.sync()
.then(() => {
    console.log('connected')
    startServer()
})
.catch((err) => {
    console.log(err)
})

const startServer = () => {
    const PORT = 4222

    app.listen(PORT, () => {
        console.log('server run in port > ', PORT)
    })
}
