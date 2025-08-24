const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "files", "stream.txt");
const filePath2 = path.join(__dirname, "files", "stream2.txt");

const rs = fs.createReadStream(filePath, { encoding: "utf-8" });
const ws = fs.createWriteStream(filePath2);

// async, rs listens to `data` emit event
rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});

// OR
// rs.pipe(ws)