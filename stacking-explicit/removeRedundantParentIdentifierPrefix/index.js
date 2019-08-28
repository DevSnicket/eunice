// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const { createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		createYamlFromStack(
			withGetIdentifierWithoutParentWhenPrefixed(
				({
					identifier,
					parentIdentifier,
				}) =>
					getIdentifierWithoutParentAndSeparatorWhenPrefixed({
						identifier,
						identifierSeparator,
						parentIdentifier,
					}),
			)
			.removeFromStack(
				createStackFromYaml(items),
			),
		);

function getIdentifierWithoutParentAndSeparatorWhenPrefixed({
	identifier,
	identifierSeparator,
	parentIdentifier,
}) {
	return isPrefixed() && cropPrefixFromStart();

	function isPrefixed() {
		return parentIdentifier && identifier.startsWith(parentIdentifier + identifierSeparator);
	}

	function cropPrefixFromStart() {
		return identifier.substring(parentIdentifier.length + identifierSeparator.length);
	}
}

function withGetIdentifierWithoutParentWhenPrefixed(
	getIdentifierWithoutParentWhenPrefixed,
) {
	return { removeFromStack };

	function removeFromStack(
		stack,
	) {
		return stack.map(level => level.map(removeFromItem));
	}

	function removeFromItem({
		dependsUpon,
		id: identifier,
		items,
		...restOfItem
	}) {
		return (
			{
				...getIdentifierProperty({
					identifier,
					parent: getParentOfItem(restOfItem),
				}),
				dependsUpon:
					removeFromDependsUpon(),
				...restOfItem,
				items:
					removeFromItems(),
			}
		);

		function removeFromDependsUpon() {
			return (
				dependsUpon
				&&
				dependsUpon.map(removeFromDependUpon)
			);
		}

		function removeFromItems() {
			return items && removeFromStack(items);
		}
	}

	function removeFromDependUpon(
		dependUpon,
	) {
		return (
			whenString()
			||
			{
				item: removeFromDependUponItem(dependUpon.item),
				parent: dependUpon.parent,
			}
		);

		function whenString() {
			return (
				typeof dependUpon.item === "string"
				&&
				(whenHasAncestors() || dependUpon)
			);

			function whenHasAncestors() {
				return (
					dependUpon.ancestors
					&&
					{
						ancestors:
							[
								...dependUpon.ancestors.slice(0, -1),
								removeFromBaseAncestor(),
							],
						item:
							dependUpon.item,
					}
				);

				function removeFromBaseAncestor() {
					const baseAncestor =
						dependUpon.ancestors[dependUpon.ancestors.length - 1];

					return whenItem() || baseAncestor;

					function whenItem() {
						return (
							baseAncestor
							&&
							typeof baseAncestor !== "string"
							&&
							removeFromDependUponItem(baseAncestor)
						);
					}
				}
			}
		}
	}

	function removeFromDependUponItem({
		id: identifier,
		...restOfItem
	}) {
		return (
			{
				...getIdentifierProperty({
					identifier,
					parent: getParentOfItem(restOfItem),
				}),
				...restOfItem,
			}
		);
	}

	function getParentOfItem(
		item,
	) {
		return item.level.stack.parent;
	}

	function getIdentifierProperty({
		identifier,
		parent,
	}) {
		return (
			{
				id:
					getIdentifierWithoutPrefix()
					||
					identifier,
			}
		);

		function getIdentifierWithoutPrefix() {
			return (
				identifier
				&&
				parent
				&&
				getIdentifierWithoutParentWhenPrefixed({
					identifier,
					parentIdentifier: parent.id,
				})
			);
		}
	}
}