const express = require('express')
const morgan = require('morgan')
const app = express()

const session = require('express-session')

app.use(express.json()) // allows req.body with json
app.use(morgan('tiny'))

app.use(
  session({
    secret: 'my super secret',
    saveUninitialized: false, // dont start with session created
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // two weeks
    },
  })
)

app.get('/auth/me', (req, res, next) => {
  console.log('Session: ', req.session)
  res.status(200).send(req.session.data)
})

app.post('/auth/add_info', (req, res, next) => {
  console.log('Req.body', req.body)
  req.session.data = req.body
  res.status(200).send(req.session)
})

app.delete('/auth/delete', (req, res) => {
  req.session.destroy()
  res.sendStatus(204)
})

const SERVER_PORT = 4000
app.listen(SERVER_PORT, () =>
  console.log(`Server started, port: ${SERVER_PORT}`)
)
