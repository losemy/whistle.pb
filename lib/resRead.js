const axios = require('axios')
let {set} = require('./map.js')
let {decodeUrl} = require('./config.js')
const {isProto} = require("./proto");

module.exports = (server, options) => {
  let index = 1
  server.on('request', (req, res) => {
    let body;
    let contentType = res.headers["content-type"];
    req.on('data', (data) => {
      body = body ? Buffer.concat([body, data]) : data;
      set('res'+ index, body)
    });
    req.on('end', () => {
      if (body && isProto(contentType)) {
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
            console.log("res bad request")
            res.end(body)
          })
      } else {
        res.end(body);
      }
      index++
    });
  });
};
