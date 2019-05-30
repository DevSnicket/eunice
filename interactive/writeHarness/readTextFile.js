const fs = require("fs-extra");

module.exports =
	filePath => fs.readFile(filePath, "utf-8");