// Preloaded by `npm start` (node -r). Stops the dev server if the whole process, not only the
// V8 heap, uses more memory than DEV_MEMORY_LIMIT_MB (default 3072).
// The check runs on its own thread so a build that is blocking the main thread cannot delay it.
const fs = require("fs");
const { Worker, isMainThread, workerData } = require("worker_threads");

// `node -r` also loads this file inside every worker, so only the main thread may start one.
if (isMainThread && !process.env.DEV_MEMORY_GUARD_DISABLED) {
  const limitMb = Number(process.env.DEV_MEMORY_LIMIT_MB) || 3072;
  fs.writeSync(2, `[memory guard] The dev server will stop if its RSS passes ${limitMb} MB.\n`);
  new Worker(
    `const fs = require("fs");
     const { limitMb } = require("worker_threads").workerData;
     setInterval(() => {
       const rssMb = Math.round(process.memoryUsage.rss() / 1048576);
       if (rssMb <= limitMb) return;
       fs.writeSync(2, "\\n[memory guard] STOPPING the dev server: RSS is " + rssMb + " MB, over the " + limitMb + " MB limit.\\n" +
         "[memory guard] This suggests a memory leak. Run npm start again to continue, or set DEV_MEMORY_LIMIT_MB to change the limit.\\n");
       process.kill(process.pid, "SIGKILL");
     }, 1000);`,
    { eval: true, workerData: { limitMb } }
  ).unref();
}
