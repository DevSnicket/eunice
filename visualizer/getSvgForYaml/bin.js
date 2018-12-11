#!/usr/bin/env node
const
	callWhenProcessEntryPoint = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getSvgForYaml = require(".");

callWhenProcessEntryPoint({
	action:
		processArguments =>
			getSvgForYaml({
				...processArguments,
				subsetIdentifierHierarchy:
					typeof processArguments.subsetIdentifierHierarchy === "string"
					?
					[ processArguments.subsetIdentifierHierarchy ]
					:
					processArguments.subsetIdentifierHierarchy,
			}),
	standardInputParameter:
		"yaml",
});