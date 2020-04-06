// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import removePrefixInDependsUpon from "./removePrefixInDependsUpon";
import { replaceDependsUpon } from "@devsnicket/eunice-processors/replacement";
import replaceItemsOfDependsUponWithIdentifier from "./replaceItemsOfDependsUponWithIdentifier";

export default ({
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