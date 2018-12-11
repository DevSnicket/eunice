#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../callWithProcessStandardStreamsOfYaml"),
	unstackIndependent = require("./");

callWithProcessStandardStreamsOfYaml(
	parameters => unstackIndependent(parameters.items),
);