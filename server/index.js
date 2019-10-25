require('dotenv').config()

const express = require('express')
const session = require('express-session');
const app = express()

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json()) // allows req.body with json

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false, // dont start with session created
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // two weeks
    }

}))

app.get('/api/get_session', (req, res) => {
    res.status(200).send(req.session.data)
})
app.post('/api/set_data_in_session', (req, res) => {
    req.session.data = req.body
    res.status(200).send(req.session.data)
})
app.post('/api/destroy_data_in_session', (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
})

app.listen(SERVER_PORT || 4000, () => console.log(`Server started, port: ${SERVER_PORT}`))
