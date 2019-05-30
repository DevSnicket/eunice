/* istanbul ignore file: test would be a mirror of implementation */
const
	createWebpackConfiguration = require("./createWebpackConfiguration"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	writeHarness = require("./writeHarness");

module.exports =
	{
		createWebpackConfiguration,
		createYamlInputElement,
		createYamlOutputElement,
		writeHarness,
	};