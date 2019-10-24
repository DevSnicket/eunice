#!/usr/bin/env node
// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	callWithProcessStandardStreamsOfYaml = require("../callWithProcessStandardStreamsOfYaml"),
	unstackIndependent = require("./");

callWithProcessStandardStreamsOfYaml(
	parameters => unstackIndependent(parameters.items),
);