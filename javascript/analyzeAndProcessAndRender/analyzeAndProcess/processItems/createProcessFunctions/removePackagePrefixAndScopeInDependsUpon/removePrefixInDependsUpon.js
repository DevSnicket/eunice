module.exports =
	({
		dependsUpon,
		prefix,
	}) =>
		dependsUpon
		&&
		withPrefix(prefix)
		.removePrefixInDependsUpon(dependsUpon);

function withPrefix(
	prefix,
) {
	return { removePrefixInDependsUpon };

	function removePrefixInDependsUpon(
		dependsUpon,
	) {
		return whenArray() || removePrefixInDependUpon(dependsUpon);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.map(removePrefixInDependUpon)
			);
		}
	}

	function removePrefixInDependUpon(
		dependUpon,
	) {
		return whenString() || inIdentifier();

		function whenString() {
			return (
				typeof dependUpon === "string"
				&&
				removePrefixFromIdentifier(dependUpon)
			);
		}

		function inIdentifier() {
			return (
				{
					id:
						removePrefixFromIdentifier(
							dependUpon.id,
						),
					items:
						dependUpon.items,
				}
			);
		}
	}

	function removePrefixFromIdentifier(
		identifier,
	) {
		return whenStartsWithPrefix() || identifier;

		function whenStartsWithPrefix() {
			return (
				identifier.startsWith(prefix)
				&&
				identifier.substr(prefix.length)
			);
		}
	}
}