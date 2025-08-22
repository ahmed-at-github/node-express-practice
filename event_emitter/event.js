const logEvents = require("./logEvents");
const EventEmitter = require("events");


// Create a custom class that extends EventEmitter
class MyEmitter extends EventEmitter {}

// Initialize an instance of MyEmitter
const myEmitter = new MyEmitter();

// Add a listener for the 'log' event that calls logEvents with the message
myEmitter.on("log", (msg) => logEvents(msg));

// Emit the 'log' event after a 2.5 second delay
setTimeout(() => {
  // Emit the 'log' event with a message
  myEmitter.emit("log", "log event emitted");
}, 2500);
