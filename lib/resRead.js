const axios = require('axios')
let {set} = require('./map.js')
let {decodeUrl} = require('./config.js')

module.exports = (server, options) => {
  let index = 1
  server.on('request', (req, res) => {
    let body;
    req.on('data', (data) => {
      body = body ? Buffer.concat([body, data]) : data;
      set('res'+ index, body)
    });
    req.on('end', () => {
      // const contentType = req.headers['content-type']
      // console.log("resRead contentType: " + contentType)
      // console.log("resRead index: " + index)
      if (body) {
        axios
          .post(decodeUrl, body)
          .then(r => {
            // console.log(`状态码: ${r.status}`)
            // console.log('resRead: '+ r.headers["index"])
            // req.headers["index"] = r.headers["index"]
            res.end(JSON.stringify(r.data))
            // res.header.set("index", r.headers["index"])
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        res.end(body);
      }
      index++
    });
  });
};
