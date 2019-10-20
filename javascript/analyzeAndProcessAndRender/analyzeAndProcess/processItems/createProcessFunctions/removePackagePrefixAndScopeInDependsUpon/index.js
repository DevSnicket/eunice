// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	removePrefixInDependsUpon = require("./removePrefixInDependsUpon"),
	{ replacement: { replaceDependsUpon } } = require("@devsnicket/eunice-processors"),
	replaceItemsOfDependsUponWithIdentifier = require("./replaceItemsOfDependsUponWithIdentifier");

module.exports =
	({
		items,
		prefix,
		scope,
	}) => {
		return (
			whenHasScope()
			||
			whenHasPrefix()
			||
			items
		);

		function whenHasScope() {
			return (
				scope
				&&
				replaceDependsUpon({
					getDependsUponReplacement:
						dependsUpon =>
							replaceItemsOfDependsUponWithIdentifier({
								dependsUpon,
								identifier:
									`@${scope}`,
								replaceDependsUponItems:
									dependsUponItem =>
										removePrefixInDependsUpon({
											dependsUpon: dependsUponItem,
											prefix,
										}),
							}),
					identifierOrItemOrLevelOrStack:
						items,
				})
			);
		}

		function whenHasPrefix() {
			return (
				prefix
				&&
				replaceDependsUpon({
					getDependsUponReplacement,
					identifierOrItemOrLevelOrStack: items,
				})
			);

			function getDependsUponReplacement(
				dependsUpon,
			) {
				return (
					removePrefixInDependsUpon({
						dependsUpon,
						prefix,
					})
				);
			}
		}
	};