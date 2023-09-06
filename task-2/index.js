const os = require("os");
const childProcess = require("child_process");
const fs = require("fs");

(() => {
  const platform = os.platform();

  const isWindows = platform === "win32";

  const command = isWindows
    ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
    : "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

  let activities = [];

  setInterval(() => {
    childProcess.exec(command, (error, stdout, stderr) => {
      console.clear();
      console.log(stdout);

      activities.push(`${Date.now()}: ${stdout}`);

      if (error !== null) {
        console.log(`error: ${error}`);
      }
    });
  }, 100);

  setInterval(() => {
    fs.appendFile("activityMonitor.log", activities.join(""), (err) => {
      activities = [];
      if (err) throw err;
    });
  }, 60000);
})();
