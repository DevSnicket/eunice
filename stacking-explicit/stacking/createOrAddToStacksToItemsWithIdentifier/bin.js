#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksToItemsWithIdentifier = require("./"),
	parseCommaSeparated = require("../parseCommaSeparated");

callWithProcessStandardStreamsOfYaml(
	({
		commaSeparatedLevels,
		identifierPattern,
		items,
	}) =>
		createOrAddToStacksToItemsWithIdentifier({
			identifierPattern:
				new RegExp(identifierPattern),
			identifiersInNewStack:
				parseCommaSeparated(commaSeparatedLevels),
			items,
		}),
);