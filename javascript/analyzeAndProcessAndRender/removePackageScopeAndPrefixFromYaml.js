module.exports =
	({
		packages,
		yaml,
	}) => {
		return (
			whenHasPrefixOrScopePrefix()
			||
			yaml
		);

		function whenHasPrefixOrScopePrefix() {
			return (
				packages
				&&
				(packages.scope || packages.prefix)
				&&
				yaml
				.replace(
					createRemoveFromYamlRegExp(),
					"$1",
				)
			);
		}

		function createRemoveFromYamlRegExp() {
			return (
				new RegExp(
					addScopeToPattern({
						pattern: `${packages.prefix}(.*)`,
						scope: packages.scope,
					}),
					"g",
				)
			);
		}
	};

function addScopeToPattern({
	pattern,
	scope,
}) {
	return whenHasScope() || pattern;

	function whenHasScope() {
		return (
			scope
			&&
			`'@${scope}/${pattern}'`
		);
	}
}