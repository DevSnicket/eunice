// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

import createFromIdentifiers from "../../createFromIdentifiers";
import whenIdentifier from "./whenIdentifier";
import whenItemFound from "./whenItemFound";

export default findInAncestors;

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