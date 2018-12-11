#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksToItemsWithIdentifier = require("./"),
	parseCommaSeparated = require("../parseCommaSeparated");

callWithProcessStandardStreamsOfYaml(
	({
		commaSeparatedLevels,
		items,
		toIdentifier,
	}) =>
		createOrAddToStacksToItemsWithIdentifier({
			identifiersInNewStack:
				parseCommaSeparated(commaSeparatedLevels),
			items,
			toIdentifier,
		}),
);