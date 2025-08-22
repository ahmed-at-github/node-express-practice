const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (msg) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${msg}`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem + "\n"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
