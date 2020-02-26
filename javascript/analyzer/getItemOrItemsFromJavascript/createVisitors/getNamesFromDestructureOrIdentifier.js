// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default getNamesFromDestructureOrIdentifier;

function getNamesFromDestructureOrIdentifier({
	argument,
	elements,
	left,
	name,
	properties,
	type,
}) {
	return (
		whenArray()
		||
		whenAssignment()
		||
		whenObject()
		||
		getNamesWhenRest({
			argument,
			type,
		})
		||
		[ name ]
	);

	function whenArray() {
		return (
			type === "ArrayPattern"
			&&
			elements.flatMap(
				element =>
					element ? element.name : [],
			)
		);
	}

	function whenAssignment() {
		return (
			type === "AssignmentPattern"
			&&
			getNamesFromDestructureOrIdentifier(left)
		);
	}

	function whenObject() {
		return (
			type === "ObjectPattern"
			&&
			properties.flatMap(getNamesFromProperty)
		);
	}
}

function getNamesFromProperty(
	property,
) {
	return (
		getNamesWhenRest(property)
		||
		getNamesFromDestructureOrIdentifier(property.value)
	);
}

function getNamesWhenRest({
	argument,
	type,
}) {
	return (
		type === "RestElement"
		&&
		[ argument.name ]
	);
}