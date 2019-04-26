/* istanbul ignore file: test would be a mirror of implementation */
const
	createJavascriptInputElement = require("./harness/createJavascriptInputElement"),
	getOrCreateItemsInDirectory = require("./getOrCreateItemsInDirectory"),
	getYamlFromJavaScript = require("./getYamlFromJavaScript");

module.exports =
	{
		getOrCreateItemsInDirectory,
		getYamlFromJavaScript,
		harness: { createJavascriptInputElement },
	};