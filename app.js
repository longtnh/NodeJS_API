const express = require('express')
const logger = require('morgan')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/demo_node_api', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database'))

app.use(logger('dev'))

app.use(express.json())

const userRouter = require('./routes/user')
app.use('/user', userRouter)

const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening in port ${port}`))