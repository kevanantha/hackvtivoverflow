if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const CronJob = require('cron').CronJob
const axios = require('axios')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const routes = require('./routes')
const errorHandler = require('./middlwares/errorHandler')

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

io.on('connection', function(socket) {
  new CronJob(
    // '*/5 * * * * *',
    '0 0 10 * * 7',
    async function() {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'https://favqs.com/api/qotd'
          // headers: {
          //   Accept: 'application/json'
          // }
        })
        socket.emit('getQuotes', data.quote)
      } catch (err) {
        console.log(err.message)
      }
    },
    null,
    true,
    'Asia/Jakarta'
  )
})

app.use(errorHandler)

server.listen(PORT, () => console.log(`Server runs on PORT ${PORT}`))
