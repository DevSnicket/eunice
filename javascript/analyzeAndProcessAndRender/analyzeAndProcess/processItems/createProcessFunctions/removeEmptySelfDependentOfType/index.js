// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { replaceIdentifiersAndItems } from "@devsnicket/eunice-processors/replacement";

export default ({
	identifierOrItemOrLevelOrStack,
	types,
}) =>
	replaceIdentifiersAndItems({
		identifierOrItemOrLevelOrStack,
		replace:
			({ identifierOrItem }) =>
				removeSelfDependentOfTypes({
					identifierOrItem,
					types,
				}),
	});

function removeSelfDependentOfTypes({
	identifierOrItem,
	types,
}) {
	return (
		isOfTypeAndSelfDependent()
		?
		null
		:
		identifierOrItem
	);

	function isOfTypeAndSelfDependent() {
		return (
			types.includes(identifierOrItem.type)
			&&
			isEmptyAndSelfDependent(identifierOrItem)
		);
	}
}

function isEmptyAndSelfDependent({
	id: identifier,
	dependsUpon,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	type,
	...restOfItem
}) {
	return isEmpty() && isSelfDependent();

	function isEmpty() {
		return !Object.keys(restOfItem).length;
	}

	function isSelfDependent() {
		return (
			withLowerCaseFirstCharacter(getSingleDependsUpon(dependsUpon))
			===
			withLowerCaseFirstCharacter(identifier)
		);
	}
}

function getSingleDependsUpon(
	dependsUpon,
) {
	return whenString() || whenSingleItemArray();

	function whenString() {
		return (
			typeof dependsUpon === "string"
			&&
			dependsUpon
		);
	}

	function whenSingleItemArray() {
		return (
			Array.isArray(dependsUpon)
			&&
			dependsUpon.length === 1
			&&
			dependsUpon[0]
		);
	}
}

function withLowerCaseFirstCharacter(
	value,
) {
	return (
		value
		&&
		value.length
		&&
		value[0].toLowerCase() + value.substring(1)
	);
}