#!/usr/bin/env node
// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getYamlFromJavascript = require(".");

callWithProcessStandardStreams({
	action: parameters => getYamlFromJavascript(parameters),
	standardInputParameter: "javascript",
});