#!/usr/bin/env node
// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import callWhenProcessEntryPoint from "@devsnicket/eunice-call-with-process-standard-streams";
import getSvgForYaml from ".";

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