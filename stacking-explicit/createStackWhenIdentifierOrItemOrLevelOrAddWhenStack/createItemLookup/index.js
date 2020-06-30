// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import createForIdentifierOrItem from "./createForIdentifierOrItem";
import createForLevelOrStack from "./createForLevelOrStack";

export default
identifierOrItemOrLevelOrStack => {
	return (
		whenNoValue()
		||
		whenLevelOrStack()
		||
		createForIdentifierOrItem(identifierOrItemOrLevelOrStack)
	);

	function whenNoValue() {
		return (
			!identifierOrItemOrLevelOrStack
			&&
			{
				getIdentifiersNotUsed:
					() => null,
				useItem:
					// match other definition
					// eslint-disable-next-line no-unused-vars
					identifierOrItem => null,
			}
		);
	}

	function whenLevelOrStack() {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			&&
			createForLevelOrStack(identifierOrItemOrLevelOrStack)
		);
	}
};