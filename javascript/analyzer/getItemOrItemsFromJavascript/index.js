// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createSortItemForIsBottomUp from "./createSortItemForIsBottomUp";
import createVisitors from "./createVisitors";
import parseJavascriptWithBabelParserPlugins from "./parseJavascriptWithBabelParserPlugins";
import walk from "./walk";

export default
(/** @type {import("./Parameter.d")} */{
	babelParserPlugins,
	directoryPath,
	fileExtensions,
	isBottomUp,
	isCalleeIgnored,
	javascript,
}) =>
	getItemOrItems({
		directoryPath,
		fileExtensions,
		isBottomUp,
		isCalleeIgnored,
		javascript,
		parseJavascript:
			withBabelParserPlugins(babelParserPlugins)
			.parseJavascript,
	});

function withBabelParserPlugins(
	babelParserPlugins,
) {
	return { parseJavascript };

	function parseJavascript(
		javascript,
	) {
		return (
			parseJavascriptWithBabelParserPlugins({
				babelParserPlugins,
				javascript,
			})
		);
	}
}

function getItemOrItems({
	directoryPath,
	fileExtensions,
	isBottomUp,
	isCalleeIgnored,
	javascript,
	parseJavascript,
}) {
	const visitors =
		createVisitors({
			directoryPath,
			fileExtensions,
			isCalleeIgnored,
			parseJavascript,
			sortItems:
				createSortItemForIsBottomUp(isBottomUp),
		});

	walk({
		node: parseJavascript(javascript),
		visitors,
	});

	return visitors.getItemOrItems();
}