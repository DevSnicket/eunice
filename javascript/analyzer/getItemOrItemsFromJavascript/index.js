/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createVisitors from "./createVisitors";
import { moveVariablesThenParametersThenImportsToBottom } from "./itemSorting";
import parseJavascriptWithBabelParserPlugins from "./parseJavascriptWithBabelParserPlugins";
import stackItemsWhenMultiple from "./stackItemsWhenMultiple";
import walk from "./walk";

export default
(/** @type {import("./Parameter.d")} */{
	babelParserPlugins,
	directoryPath,
	fileExtensions,
	isCalleeIgnored,
	javascript,
	sortItems = moveVariablesThenParametersThenImportsToBottom,
	structureItems = stackItemsWhenMultiple,
}) =>
	getItemOrItems({
		directoryPath,
		fileExtensions,
		isCalleeIgnored,
		javascript,
		parseJavascript:
			withBabelParserPlugins(babelParserPlugins)
			.parseJavascript,
		sortItems,
		structureItems,
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
	isCalleeIgnored,
	javascript,
	parseJavascript,
	sortItems,
	structureItems,
}) {
	const visitors =
		createVisitors({
			directoryPath,
			fileExtensions,
			isCalleeIgnored,
			parseJavascript,
			sortItems,
			structureItems,
		});

	walk({
		node: parseJavascript(javascript),
		visitors,
	});

	return visitors.getItemOrItems();
}