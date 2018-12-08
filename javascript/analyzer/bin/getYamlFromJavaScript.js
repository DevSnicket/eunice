#!/usr/bin/env node
/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWhenProcessEntryPoint = require("@devsnicket/eunice-call-when-process-entry-point"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

callWhenProcessEntryPoint({
	action: parameters => getYamlFromJavaScript(parameters.javaScript),
	standardInputParameter: "javaScript",
});