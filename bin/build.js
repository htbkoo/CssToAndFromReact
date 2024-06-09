const path = require("path");
const fs = require("fs");

const baseDirPath = `${__dirname}/..`;
const src = path.normalize(`${baseDirPath}/public`);
const dst = path.normalize(`${baseDirPath}/build`);

fs.copyFileSync(src, dst);
console.log(`Copied from ${src} to ${dst}`);


