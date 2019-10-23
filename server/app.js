if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const PORT = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const routes = require('./routes')
const errorHandler = require('./middlwares/errorHandler')

const app = express()

mongoose.set('useCreateIndex', true)
mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => console.log('Connected to DB'))
  .catch(err => console.log(err))

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server runs on PORT ${PORT}`))
