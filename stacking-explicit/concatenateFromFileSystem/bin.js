#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYamlOutput = require("../callWithProcessStandardStreamsOfYamlOutput"),
	concatenateFromFileSystem = require("./");

callWithProcessStandardStreamsOfYamlOutput({
	action: ({ files }) => concatenateFromFileSystem(files),
	standardInputParameter: null,
});