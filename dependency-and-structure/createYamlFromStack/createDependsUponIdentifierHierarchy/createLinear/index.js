/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue"),
	withAncestors = require("./withAncestors");

module.exports =
	({
		ancestor,
		ancestors,
		item,
	}) => {
		return (
			whenHasAncestor()
			||
			whenHasAncestors({
				ancestors,
				item,
			})
			||
			getIdentifierPropertyOrValue(item)
		);

		function whenHasAncestor() {
			return (
				ancestor
				&&
				withAncestors({
					baseAncestor: ancestor,
					item,
				})
			);
		}
	};

function whenHasAncestors({
	ancestors,
	item,
}) {
	return (
		ancestors
		&&
		ancestors.reduce(
			(items, ancestor) => (
				{
					id: getIdentifierPropertyOrValue(ancestor),
					items,
				}
			),
			item,
		)
	);
}