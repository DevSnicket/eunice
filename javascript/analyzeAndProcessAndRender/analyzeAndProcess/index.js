/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	analyzer = require("@devsnicket/eunice-javascript-analyzer"),
	{ stacking: { createOrAddToStacksUsingFileSystem } } = require("@devsnicket/eunice-processors"),
	path = require("path"),
	processItems = require("./processItems");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		ignoreDirectoryNames,
		isClassFieldEnabled,
		isReactJsxEnabled,
		packagePrefixAndScope,
		sources,
	}) => {
		return (
			whenSingleSource()
			||
			createOrAddToStacks(
				sources.map(analyzeAndProcessSource),
			)
		);

		function whenSingleSource() {
			return (
				sources.length === 1
				&&
				analyzeAndProcessSource(sources[0])
			);
		}

		function analyzeAndProcessSource({
			directory,
			rootItemIdentifier,
		}) {
			const items =
				analyzer.getOrCreateItemsInDirectory({
					directory,
					ignoreDirectoryNames,
					isClassFieldEnabled,
					isReactJsxEnabled,
				});

			return processWhenAnyItems() || [];

			function processWhenAnyItems() {
				return (
					items.length
					&&
					processItems({
						directoryToCreateOrAddToStacksFrom:
							directory,
						identifierSeparator:
							path.sep,
						items,
						packagePrefixAndScope,
						rootItemIdentifier,
					})
				);
			}
		}

		function createOrAddToStacks(
			items,
		) {
			return (
				directoryToCreateOrAddToStacksFrom
				?
				createOrAddToStacksUsingFileSystem({
					directory: directoryToCreateOrAddToStacksFrom,
					items,
				})
				:
				items
			);
		}
	};