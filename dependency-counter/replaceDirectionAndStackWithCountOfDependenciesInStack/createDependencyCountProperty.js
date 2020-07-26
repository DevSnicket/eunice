// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default
({
	dependsUpon,
	outerDependents,
}) => {
	return (
		createPropertyWhenHasProperties(
			"dependencyCount",
			...createProperties(),
		)
	);

	function createProperties() {
		return (
			[
				createInnerProperty(),
				createOuterProperty({
					dependents: outerDependents,
					dependsUpon: dependsUpon && dependsUpon.outer,
				}),
			]
			.filter(property => property)
		);
	}

	function createInnerProperty() {
		return (
			dependsUpon
			&&
			dependsUpon.inner
			&&
			createInnerPropertyFromDependsUpon(dependsUpon.inner)
		);
	}
};

function createOuterProperty({
	dependents,
	dependsUpon,
}) {
	return (
		createPropertyWhenHasProperties(
			"outer",
			...createPropertiesForDirections(createPropertyForDirection),
		)
	);

	function createPropertyForDirection(
		direction,
	) {
		return (
			createPropertyWhenHasProperties(
				direction,
				...createRelationshipProperties(),
			)
			||
			[]
		);

		function * createRelationshipProperties() {
			if (dependents) {
				const value = dependents[direction];

				if (value)
					yield { dependents: value };
			}

			if (dependsUpon) {
				const value = dependsUpon[direction];

				if (value)
					yield { dependsUpon: value };
			}
		}
	}
}

function createInnerPropertyFromDependsUpon(
	dependsUpon,
) {
	return (
		createPropertyWhenHasProperties(
			"inner",
			...createPropertiesForDirections(createPropertyForDirection),
		)
	);

	function createPropertyForDirection(
		direction,
	) {
		return whenHasValue() || [];

		function whenHasValue() {
			const value = dependsUpon[direction];

			return (
				value
				&&
				{ [direction]: value }
			);
		}
	}
}

function createPropertiesForDirections(
	createPropertyForDirection,
) {
	return (
		[ "above", "below", "same" ]
		.flatMap(createPropertyForDirection)
	);
}

function createPropertyWhenHasProperties(
	name,
	...properties
) {
	return (
		properties.length
		&&
		{ [name]: Object.assign({}, ...properties) }
	);
}