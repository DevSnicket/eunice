/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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
	dependUponItem,
}) {
	return (
		whenIdentifier({
			ancestors,
			dependUponItem,
		})
		||
		whenItemFound({
			ancestors,
			dependUponItem,
			findInAncestors,
		})
		||
		fromIdentifiers()
	);

	function fromIdentifiers() {
		return (
			createFromIdentifiers(dependUponItem)
			.map(
				dependUpon => (
					{
						ancestors:
							[ ...dependUpon.ancestors, ...ancestors ],
						item:
							dependUpon.item,
					}
				),
			)
		);
	}
}