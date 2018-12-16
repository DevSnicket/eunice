#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../callWithProcessStandardStreamsOfYaml"),
	setIdentifierOfAnonymousToParent = require("./");

callWithProcessStandardStreamsOfYaml(
	parameters => setIdentifierOfAnonymousToParent(parameters.items),
);