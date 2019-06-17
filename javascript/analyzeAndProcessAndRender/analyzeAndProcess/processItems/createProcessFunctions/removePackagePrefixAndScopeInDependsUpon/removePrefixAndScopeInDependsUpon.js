const removePrefixInDependsUpon = require("./removePrefixInDependsUpon");

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		dependsUpon,
		prefix,
		scope,
	}) =>
		dependsUpon
		&&
		withPrefixAndSuffix({
			prefix,
			scopeIdentifier: `@${scope}`,
		})
		.removePrefixAndScopeInDependsUpon(
			dependsUpon,
		);

function withPrefixAndSuffix({
	prefix,
	scopeIdentifier,
}) {
	return { removePrefixAndScopeInDependsUpon };

	function removePrefixAndScopeInDependsUpon(
		dependsUpon,
	) {
		return whenArray() || removePrefixAndScopeInDependUpon(dependsUpon);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.flatMap(removePrefixAndScopeInDependUpon)
			);
		}
	}

	function removePrefixAndScopeInDependUpon(
		dependUpon,
	) {
		return whenHasScope() || dependUpon;

		function whenHasScope() {
			return (
				dependUpon.id === scopeIdentifier
				&&
				removePrefixInDependsUpon({
					dependsUpon: dependUpon.items,
					prefix,
				})
			);
		}
	}
}