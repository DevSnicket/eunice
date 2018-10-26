module.exports =
	({
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
				callExpression.arguments.reduce(
					(aggregation, argument) =>
						argument.type === "ObjectExpression"
						?
						[ ...aggregation, ...getPropertyValues(argument.properties) ]
						:
						[ ...aggregation, argument ],
					[],
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