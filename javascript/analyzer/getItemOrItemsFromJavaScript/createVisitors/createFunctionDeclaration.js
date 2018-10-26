const
	getItemWhenSingleOrStackItemsWhenMultiple = require("./getItemWhenSingleOrStackItemsWhenMultiple"),
	getPropertyName = require("./getPropertyName");

module.exports =
	({
		dependsUponProperty,
		functionDeclaration,
		hasUndeclaredReferenceTo,
		identifier,
		items,
	}) => {
		const itemOrItems =
			getItemWhenSingleOrStackItemsWhenMultiple(
				[
					...createParameterItemsForFunction({
						functionDeclaration,
						getPropertyName,
						hasUndeclaredReferenceTo,
					}),
					...items || [],
				],
			);

		return (
			{
				...identifier && { id: identifier },
				isFunction: true,
				...dependsUponProperty,
				...itemOrItems && { items: itemOrItems },
			}
		);
	};

function createParameterItemsForFunction({
	functionDeclaration,
	hasUndeclaredReferenceTo,
}) {
	return (
		functionDeclaration.params
		.reduce(
			(aggregation, parameter) =>
				parameter.type === "ObjectPattern"
				?
				[ ...aggregation, ...parameter.properties.map(getPropertyName) ]
				:
				[ ...aggregation, parameter.name ],
			[],
		)
		.filter(
			parameter =>
				hasUndeclaredReferenceTo({
					parent: functionDeclaration,
					reference: parameter,
				}),
		)
		.map(
			parameter => (
				{
					id: parameter,
					type: "parameter",
				}
			),
		)
	);
}