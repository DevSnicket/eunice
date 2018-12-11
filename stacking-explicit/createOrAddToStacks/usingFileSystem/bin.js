/* istanbul ignore file: only used when JavaScript file is process entry point */
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