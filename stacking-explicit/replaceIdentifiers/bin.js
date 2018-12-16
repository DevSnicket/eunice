#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../callWithProcessStandardStreamsOfYaml"),
	replaceIdentifiers = require(".");

callWithProcessStandardStreamsOfYaml(
	({
		items,
		pattern,
		replacement,
		rootOnly,
	}) =>
		replaceIdentifiers({
			items,
			pattern: new RegExp(pattern),
			replacement,
			rootOnly,
		}),
);