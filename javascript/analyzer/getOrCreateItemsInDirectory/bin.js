#!/usr/bin/env node
// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import callWithProcessStandardStreams from "@devsnicket/eunice-call-with-process-standard-streams";
import getOrCreateItemsInDirectory from ".";
import getYamlForItemOrItems from "../getYamlForItemOrItems";
import path from "path";

callWithProcessStandardStreams({
	action:
		async({
			directory,
			ignorePathPattern,
			...restOfProcessArguments
		}) =>
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory,
					ignorePathPattern:
						createRegularExpressionFromPathPattern(
							ignorePathPattern,
						),
					...restOfProcessArguments,
				}),
			),
});

function createRegularExpressionFromPathPattern(
	pattern,
) {
	return (
		pattern
		&&
		new RegExp(
			pattern.replace(
				/\//g,
				path.sep.replace("\\", "\\\\"),
			),
		)
	);
}