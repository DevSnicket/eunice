/* istanbul ignore file: test would be a mirror of implementation */
const
	createJavascriptEditor = require("./harness/createJavascriptEditor"),
	getOrCreateItemsInDirectory = require("./getOrCreateItemsInDirectory"),
	getYamlFromJavaScript = require("./getYamlFromJavaScript");

module.exports =
	{
		getOrCreateItemsInDirectory,
		getYamlFromJavaScript,
		harness: { createJavascriptEditor },
	};