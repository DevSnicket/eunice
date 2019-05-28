const createWebpackConfiguration = require("./createWebpackConfiguration");

module.exports =
	createWebpackConfiguration(
		{ directory: "dist/harness" },
	);