const fs = require("fs");
const path = require("path");

//async function
fs.readFile(
  path.join(__dirname, "files", "lorem.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data); //returns buffer data without utf-8
    console.log(data.toString());
  }
);

//async function
fs.writeFile(
  path.join(__dirname, "files", "newFile.txt"),
  "writing text to newFile",
  (err) => {
    if (err) throw err;
    console.log(`write complete`);

    //appendinf text to newFile
    fs.appendFile(
      path.join(__dirname, "files", "newFile.txt"),
      "\n\nappending some text",
      (err) => {
        if (err) throw err;
        console.log(`append complete`);

        //renaming file
        fs.rename(
          path.join(__dirname, "files", "newFile.txt"),
          path.join(__dirname, "files", "File.txt"),
          (err) => {
            if (err) throw err;
            console.log(`rename complete`);
          }
        );
      }
    );
  }
);

fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  "testing test.txt",
  (err) => {
    if (err) throw err;
    console.log(`append complete`);
  }
);

//in async-await 
/*
const fsPromise = require("fs").promises;
const fileOp = async () => {
  try {
    const filePath = path.join(__dirname, "files", "newFile.txt");
    const renamedPath = path.join(__dirname, "files", "File.txt");

    // write file
    await fsPromise.writeFile(filePath, "writing text to newFile");
    console.log("write complete");

    //delete file
    await fsPromise.unlink(path.join(__dirname, "files", "deleteFile.txt"));
    console.log("delete complete");

    // append text
    await fsPromise.appendFile(filePath, "\n\nappending some text");
    console.log("append complete");

    // rename file
    await fsPromise.rename(filePath, renamedPath);
    console.log("rename complete");
  } catch (err) {
    console.error(err);
  }
};

fileOp(); */

// exit on error
process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit();
});
