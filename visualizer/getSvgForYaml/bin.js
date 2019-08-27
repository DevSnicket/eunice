#!/usr/bin/env node
// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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