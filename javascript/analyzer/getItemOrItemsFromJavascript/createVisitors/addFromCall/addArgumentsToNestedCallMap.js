// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default ({
	addDependsUponIdentifier,
	callExpression,
	getIdentifierNameFromAndAddOrUpdateReference,
}) => {
	for (const argument of getArguments())
		addDependsUponIdentifier(
			getIdentifierFromArgumentWhenRelevant(
				argument,
			),
		);

	function getArguments() {
		return (
			callExpression.arguments.flatMap(
				argument =>
					argument.type === "ObjectExpression"
					?
					getPropertyValues(argument.properties)
					:
					[ argument ],
			)
		);
	}

	function getIdentifierFromArgumentWhenRelevant(
		argument,
	) {
		return (
			argument.type === "Identifier"
			&&
			getIdentifierNameFromAndAddOrUpdateReference(
				argument.name,
			)
		);
	}
};

function getPropertyValues(
	properties,
) {
	return (
		properties
		.map(
			property =>
				property.type === "SpreadElement"
				?
				property.argument
				:
				property.value,
		)
	);
}