const { replaceDependsUpon } = require("@devsnicket/eunice-processors");

module.exports =
	({
		items,
		prefix,
		scope,
	}) =>
		withPrefix(
			getDependsUponPrefixFromPackagePrefixAndScope({
				prefix,
				scope,
			}),
		)
		.replaceDependsUponIdentifierIn(
			items,
		);

function getDependsUponPrefixFromPackagePrefixAndScope({
	prefix,
	scope,
}) {
	return `${getScopeFormatted()}${prefix}`;

	function getScopeFormatted() {
		return scope && `@${scope}/`;
	}
}

function withPrefix(
	prefix,
) {
	return { replaceDependsUponIdentifierIn };

	function replaceDependsUponIdentifierIn(
		identifierOrItemOrLevelOrStack,
	) {
		return whenHasPrefix() || identifierOrItemOrLevelOrStack;

		function whenHasPrefix() {
			return (
				prefix
				&&
				replaceDependsUpon({
					getDependsUponReplacement:
						replaceInDependsUpon,
					identifierOrItemOrLevelOrStack,
				})
			);
		}
	}

	function replaceInDependsUpon(
		dependsUpon,
	) {
		return (
			dependsUpon
			&&
			(whenArray() || replaceInDependUpon(dependsUpon))
		);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.map(replaceInDependUpon)
			);
		}
	}

	function replaceInDependUpon(
		dependUpon,
	) {
		return whenString() || fromIdentifier();

		function whenString() {
			return (
				typeof dependUpon === "string"
				&&
				removePrefixFromIdentifier(dependUpon)
			);
		}

		function fromIdentifier() {
			return (
				{
					id: removePrefixFromIdentifier(dependUpon.id),
					items: dependUpon.items,
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