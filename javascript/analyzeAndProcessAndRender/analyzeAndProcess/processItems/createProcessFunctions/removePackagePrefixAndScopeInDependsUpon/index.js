const
	removePrefixAndScopeInDependsUpon = require("./removePrefixAndScopeInDependsUpon"),
	removePrefixInDependsUpon = require("./removePrefixInDependsUpon"),
	{ replaceDependsUpon } = require("@devsnicket/eunice-processors");

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
							removePrefixAndScopeInDependsUpon({
								dependsUpon,
								prefix,
								scope,
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
					getDependsUponReplacement:
						dependsUpon =>
							removePrefixInDependsUpon({
								dependsUpon,
								prefix,
							}),
					identifierOrItemOrLevelOrStack:
						items,
				})
			);
		}
	};