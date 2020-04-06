// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import findLast from "lodash/findLast";
import { replaceIdentifiersAndItems } from "@devsnicket/eunice-processors/replacement";

export default
identifierOrItemOrLevelOrStack =>
	replaceIdentifiersAndItems({
		identifierOrItemOrLevelOrStack,
		replace,
	});

function replace({
	ancestors,
	identifierOrItem,
}) {
	return (
		identifierOrItem
		&&
		(whenAnonymousExport() || identifierOrItem)
	);

	function whenAnonymousExport() {
		return (
			identifierOrItem.type === "export"
			&&
			{
				id: getParentIdentifier(),
				...identifierOrItem,
			}
		);
	}

	function getParentIdentifier() {
		const parent =
			findLast(
				ancestors,
				({ id }) => id,
			);

		return (
			parent
			&&
			parent.id
		);
	}
}