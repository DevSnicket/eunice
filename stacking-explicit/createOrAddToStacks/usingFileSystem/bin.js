#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksUsingFileSystem = require("./");

callWithProcessStandardStreamsOfYaml(
	({
		directory,
		items,
		subsetIdentifierHierarchy,
	}) =>
		createOrAddToStacksUsingFileSystem({
			directory,
			items,
			subsetIdentifierHierarchy:
				typeof subsetIdentifierHierarchy === "string"
				?
				[ subsetIdentifierHierarchy ]
				:
				subsetIdentifierHierarchy,
		}),
);