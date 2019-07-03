/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
				dependUpon
			);
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