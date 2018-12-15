#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksUniformly = require("."),
	parseCommaSeparated = require("../parseCommaSeparated");

callWithProcessStandardStreamsOfYaml(
	({
		commaSeparatedLevels,
		items,
	}) =>
		createOrAddToStacksUniformly({
			identifiersInNewStack:
				parseCommaSeparated(commaSeparatedLevels),
			items,
		}),
);