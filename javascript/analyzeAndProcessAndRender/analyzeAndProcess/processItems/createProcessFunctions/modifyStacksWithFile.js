// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	parseYaml = require("js-yaml").safeLoad,
	{ readFileSync } = require("fs"),
	{
		replacement: { replaceIdentifiersAndItemsAndLevelsAndStacks },
		stacking:
			{
				createOrAddToStacksOfParentMatch,
				createStackWhenIdentifierOrItemOrLevelOrAddWhenStack,
			},
	} = require("@devsnicket/eunice-processors");

module.exports =
	({
		filePath,
		items,
		key,
		pattern,
	}) => {
		return whenSpecified() || items;

		function whenSpecified() {
			return (
				filePath
				&&
				withTarget(
					parseYaml(
						readFileSync(
							filePath,
							"utf-8",
						),
					),
				)
			);

			function withTarget(
				targetLevelOrStack,
			) {
				const addNewInTarget = false;

				return whenHasKeyAndPattern() || uniformly();

				function whenHasKeyAndPattern() {
					return (
						key && pattern
						&&
						createOrAddToStacksOfParentMatch({
							addNewInTarget,
							items,
							keysAndPatterns:
								[ {
									key,
									pattern,
								} ],
							targetLevelOrStack,
						})
					);
				}

				function uniformly() {
					return (
						replaceIdentifiersAndItemsAndLevelsAndStacks({
							identifierOrItemOrLevelOrStack:
								items,
							replace:
								({ identifierOrItemOrLevelOrStack }) =>
									createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
										addNewInTarget,
										identifierOrItemOrLevelOrStack,
										targetLevelOrStack,
									}),
						})
					);
				}
			}
		}
	};