// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import getIdentifierOrIdentifierOfItem from "../getIdentifierOrIdentifierOfItem";

export default
identifierOrItem => {
	const identifier = getIdentifierOrIdentifierOfItem(identifierOrItem);

	let used = false;

	return (
		{
			getIdentifiersNotUsed,
			useItem,
		}
	);

	function getIdentifiersNotUsed() {
		return used ? null : [ identifier ];
	}

	function useItem(
		targetIdentifierOrItem,
	) {
		if (identifier === getIdentifierOrIdentifierOfItem(targetIdentifierOrItem)) {
			used = true;

			return identifierOrItem;
		} else
			return null;
	}
};