const
	getPropertyName = require("./getPropertyName"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple");

module.exports =
	({
		dependsUponProperty,
		functionDeclaration,
		hasUndeclaredReferenceTo,
		identifier,
		items,
	}) => {
		const itemOrItems =
			stackItemsWhenMultiple({
				items:
					[
						...createParameterItemsForFunction({
							functionDeclaration,
							hasUndeclaredReferenceTo,
						}),
						...items || [],
					],
				withSingleInArray:
					false,
			});

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