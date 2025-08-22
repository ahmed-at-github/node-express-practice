//craeting a first nodejs server

const { log } = require("console");
var http = require("http");
var fs = require("fs");
var path = require("path");

var mimeLookup = {
  ".js": "application/javascript",
  ".html": "text/html",
};
var server = http.createServer(function (request, response) {
  console.log("request staring");
  console.log(request.headers);
  console.log(request.method);
  console.log(request.url);

  if (request.method == "GET") {
    //rsolve file path to fs path
    var fileurl;
    if (request.url == "/") fileurl = "index.html";
    else fileurl = request.url;
    var filepath = path.resolve("./" + fileurl);

    //if we have the file
    var fileExt = path.extname(filepath);
    var mimetype = mimeLookup[fileExt];

    fs.exists(filepath, function (exists) {
      response.writeHead(200, { "content-type": mimetype });
      fs.createReadStream(filepath).pipe(response);
    });
  }
  //   //respond
  //   response.write("Hello World!");
  //   response.end();
});

server.listen(3000, () => {
  console.log("run all");
});
console.log("server running!");
