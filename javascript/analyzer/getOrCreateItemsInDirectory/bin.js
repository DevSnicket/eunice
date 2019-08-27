#!/usr/bin/env node
// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems"),
	path = require("path");

callWithProcessStandardStreams({
	action:
		async({
			ignorePathPattern,
			...restOfProcessArguments
		}) =>
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
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