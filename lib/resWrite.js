let {get,del} = require('./map.js')

module.exports = (server, options) => {
  let index = 1
  server.on('request', (req, res) => {
    let body;
    req.on('data', (data) => {
      body = body ? Buffer.concat([body, data]) : data;
    });
    req.on('end', () => {
      let key = 'res' + index
      res.end(get(key))
      index++
    });
  });
};
