const proxy = require('http-proxy-middleware')
const PORT = 4000
module.exports = function(app) {
    app.use(proxy('/auth', { target: `http://localhost:${PORT}/` }));
};
