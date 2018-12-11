#!/usr/bin/env node
const
	callWhenProcessEntryPoint = require("@devsnicket/eunice-call-when-process-entry-point"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

callWhenProcessEntryPoint({
	action: parameters => getYamlFromJavaScript(parameters.javaScript),
	standardInputParameter: "javaScript",
});