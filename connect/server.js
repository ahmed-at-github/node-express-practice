var connect = require("connect"),
  http = require("http");

// //connect dispatcher
var app = connect();

// //registering with http
http.createServer(app).listen(3001, () => {
  console.log("all is run");
});

//create a connect dispatcher & register it with http (lines 4-10 shrtct)
var app = connect().listen(3001, () => {
  console.log("all is run");
});
