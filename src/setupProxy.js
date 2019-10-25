const proxy = require('http-proxy-middleware')
const PORT = process.env.REACT_APP_SERVER_PORT
module.exports = function(app) {
    app.use(proxy('/api', { target: `http://localhost:${PORT}/` }));
};
