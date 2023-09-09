const http = require("http");
const fs = require("fs");
const csvtojson = require("csvtojson");
const path = require("path");

class EventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(fn);
    } else {
      this.listeners[eventName] = [fn];
    }
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listenEvent) => listenEvent !== fn
    );
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const updatedFunc = (...args) => {
      fn(...args);
      this.off(eventName, updatedFunc);
    };

    this.addListener(eventName, updatedFunc);
  }

  emit(eventName, ...args) {
    this.listeners[eventName]?.forEach((listener) => listener(...args));
  }

  listenerCount(eventName) {
    console.log(this.listeners[eventName]?.length || 0);
  }

  rawListeners(eventName) {
    console.log(this.listeners[eventName]);
  }
}

const executeFirstTask = () => {
  console.log("First task: ");

  const myEmitter = new EventEmitter();

  function c1() {
    console.log("an event occurred!");
  }

  function c2() {
    console.log("yet another event occurred!");
  }

  myEmitter.on("eventOne", c1); // Register for eventOne
  myEmitter.on("eventOne", c2); // Register for eventOne

  // Register eventOnce for one time execution
  myEmitter.once("eventOnce", () => console.log("eventOnce once fired"));
  myEmitter.once("init", () => console.log("init once fired"));

  // Register for 'status' event with parameters
  myEmitter.on("status", (code, msg) => console.log(`Got ${code} and ${msg}`));

  myEmitter.emit("eventOne");

  // Emit 'eventOnce' -> After this the eventOnce will be
  // removed/unregistered automatically
  myEmitter.emit("eventOnce");

  myEmitter.emit("eventOne");
  myEmitter.emit("init");
  myEmitter.emit("init"); // Will not be fired
  myEmitter.emit("eventOne");
  myEmitter.emit("status", 200, "ok");

  // Get listener's count
  console.log(myEmitter.listenerCount("eventOne"));

  // Get array of rawListeners//
  // Event registered with 'once()' will not be available here after the
  // emit has been called
  console.log(myEmitter.rawListeners("eventOne"));

  // Get listener's count after remove one or all listeners of 'eventOne'
  myEmitter.off("eventOne", c1);
  console.log(myEmitter.listenerCount("eventOne"));
  myEmitter.off("eventOne", c2);
  console.log(myEmitter.listenerCount("eventOne"));
};

const executeSecondTask = () => {
  console.log("Second task: ");

  class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
      this.emit("begin");
      const startedAt = Date.now();
      const responseData = await asyncFunc(...args);

      this.emit("end");
      const finishedAt = Date.now();

      console.log(responseData);
      console.log(
        `Result: started at ${startedAt}, finished at: ${finishedAt}`
      );
    }
  }

  const withTime = new WithTime();

  withTime.on("begin", () => console.log("About to execute"));
  withTime.on("end", () => console.log("Done with execute"));

  withTime.execute(() => {
    return new Promise((resolve, reject) =>
      http
        .get("http://jsonplaceholder.typicode.com/posts/1", (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (error) => {
          reject(error);
          console.error(`Error: ${error.message}`);
        })
    );
  });
};

const executeThirdTask = () => {
  const csvFilePath = path.join(__dirname, "./csvdirectory/table.csv");
  const txtFilePath = path.join(__dirname, "./csvdirectory/table.txt");

  const readStream = fs.createReadStream(csvFilePath, { encoding: "utf-8" });
  const writeStream = fs.createWriteStream(txtFilePath, { encoding: "utf-8" });

  readStream
    .pipe(csvtojson({ delimiter: ";" }))
    .on("data", (row) => {
      try {
        const parsedRow = JSON.parse(Buffer.from(row).toString("utf-8"));

        const formattedJson = {
          book: parsedRow["Book"],
          author: parsedRow["Author"],
          price: parseFloat(parsedRow["Price"].replace(",", ".")),
        };

        writeStream.write(`${JSON.stringify(formattedJson)}\n`);
      } catch (error) {
        console.error("Error writing to the text file:", error);
      }
    })
    .on("end", () => {
      console.log("Completed");
      writeStream.end();
    })
    .on("error", (error) => {
      console.error("Error:", error);
    });
};

executeFirstTask();
executeSecondTask();
executeThirdTask();
