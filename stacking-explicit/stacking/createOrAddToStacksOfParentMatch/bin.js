#!/usr/bin/env node
// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksOfParentMatch = require("."),
	parseCommaSeparated = require("../parseCommaSeparated");

callWithProcessStandardStreamsOfYaml(
	({
		commaSeparatedLevels,
		key,
		items,
		pattern,
	}) =>
		createOrAddToStacksOfParentMatch({
			items,
			keysAndPatterns:
				[ {
					key,
					pattern: new RegExp(pattern),
				} ],
			targetLevelOrStack:
				parseCommaSeparated(commaSeparatedLevels),
		}),
);