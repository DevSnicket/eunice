/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		itemIdentifierSelector,
		itemsSelector,
		parentsWithItems,
		type,
	}) =>
		parentsWithItems.length
		&&
		formatMessage({
			formatParentWithItems:
				parentWithItems =>
					combineParentAndItemsFormatted({
						items:
							formatItems({
								itemIdentifierSelector,
								items: itemsSelector(parentWithItems),
							}),
						parent:
							formatParent(
								parentWithItems.parent,
							),
					}),
			parentsWithItems,
			type,
		});

function formatItems({
	itemIdentifierSelector,
	items,
}) {
	return (
		items
		.map(item => `"${itemIdentifierSelector(item)}"`)
		.join(",")
	);
}

function formatParent({
	end,
	id,
	start,
}) {
	return `Expression from character ${start} to ${end}${formatParentIdentifier(id)}`;
}

function formatParentIdentifier(
	identifier,
) {
	return (
		identifier
		?
		` with identifier "${identifier.name}"`
		:
		""
	);
}

function combineParentAndItemsFormatted({
	items,
	parent,
}) {
	return `${parent} contains unhandled identifiers of ${items}`;
}

function formatMessage({
	formatParentWithItems,
	parentsWithItems,
	type,
}) {
	return (
		[
			`Unhandled ${type}:`,
			...parentsWithItems.map(formatParentWithItems),
		]
		.join("\n")
	);
}