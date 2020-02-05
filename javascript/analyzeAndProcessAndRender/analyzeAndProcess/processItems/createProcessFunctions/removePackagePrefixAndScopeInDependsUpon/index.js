// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	removePrefixInDependsUpon = require("./removePrefixInDependsUpon"),
	{ replacement: { replaceDependsUpon } } = require("@devsnicket/eunice-processors"),
	replaceItemsOfDependsUponWithIdentifier = require("./replaceItemsOfDependsUponWithIdentifier");

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		prefix,
		scope,
	}) => {
		return (
			whenHasScope()
			||
			whenHasPrefix()
			||
			identifierOrItemOrLevelOrStack
		);

		function whenHasScope() {
			return (
				scope
				&&
				replaceDependsUpon({
					identifierOrItemOrLevelOrStack,
					replace:
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
				})
			);
		}

		function whenHasPrefix() {
			return (
				prefix
				&&
				replaceDependsUpon({
					identifierOrItemOrLevelOrStack,
					replace,
				})
			);

			function replace(
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