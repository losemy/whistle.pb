let {get,del} = require('./map.js')

module.exports = (server, options) => {
  let index = 1
  server.on('request', (req, res) => {
    let body;
    req.on('data', (data) => {
      body = body ? Buffer.concat([body, data]) : data;
    });
    req.on('end', () => {
      let key = 'req' + index
      // console.log("reqWrite index: " + index)
      // console.log("body:"+ body.length)
      res.end(get(key))
      del(key)
      
      index++
    });
  });
};
