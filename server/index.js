const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const app = express()

app.use(express.json()) // allows req.body with json
app.use(morgan('tiny'))
app.use(session({
    secret: 'my super secret',
    saveUninitialized: false, // dont start with session created
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // two weeks
    }

}))


app.get('/auth/get_session', (req, res) => {
    res.status(200).send(req.session.data)
})
app.post('/auth/set_data_in_session', (req, res) => {
    req.session.data = req.body
    res.status(200).send(req.session.data)
})
app.post('/auth/destroy_data_in_session', (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
})

const SERVER_PORT = 4000
app.listen(SERVER_PORT, () => console.log(`Server started, port: ${SERVER_PORT}`))
