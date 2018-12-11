#!/usr/bin/env node
const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

callWithProcessStandardStreams({
	action: parameters => getYamlFromJavaScript(parameters.javaScript),
	standardInputParameter: "javaScript",
});