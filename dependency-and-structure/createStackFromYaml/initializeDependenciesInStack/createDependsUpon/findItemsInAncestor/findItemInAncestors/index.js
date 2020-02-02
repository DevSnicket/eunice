// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const
	createFromIdentifiers = require("../../createFromIdentifiers"),
	whenIdentifier = require("./whenIdentifier"),
	whenItemFound = require("./whenItemFound");

module.exports = findInAncestors;

function findInAncestors({
	ancestors,
	dependent,
	dependUponItem,
}) {
	return (
		whenIdentifier({
			ancestors,
			dependUponItem,
			dependent,
		})
		||
		whenItemFound({
			ancestors,
			dependUponItem,
			dependent,
			findInAncestors,
		})
		||
		createFromIdentifiers(dependUponItem)
		.map(createWithAncestors)
	);

	function createWithAncestors({
		ancestors: ancestorIdentifiers,
		item,
	}) {
		return (
			{
				ancestors:
					[
						...ancestorIdentifiers,
						...ancestors,
					],
				item,
				itemOrFirstAncestorItem:
					ancestors[0],
			}
		);
	}
}