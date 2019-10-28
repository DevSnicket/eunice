// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createVisitors = require("./createVisitors"),
	parseJavascriptWithBabelParserPlugins = require("./parseJavascriptWithBabelParserPlugins"),
	walk = require("./walk");

module.exports =
	(/** @type {import("./Parameter.d")} */{
		babelParserPlugins,
		directoryAbsolutePath,
		fileExtensions,
		isCalleeIgnored,
		javascript,
	}) =>
		getItemOrItems({
			directoryAbsolutePath,
			fileExtensions,
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
	directoryAbsolutePath,
	fileExtensions,
	isCalleeIgnored,
	javascript,
	parseJavascript,
}) {
	const visitors =
		createVisitors({
			directoryAbsolutePath,
			fileExtensions,
			isCalleeIgnored,
			parseJavascript,
		});

	walk({
		node: parseJavascript(javascript),
		visitors,
	});

	return visitors.getItemOrItems();
}