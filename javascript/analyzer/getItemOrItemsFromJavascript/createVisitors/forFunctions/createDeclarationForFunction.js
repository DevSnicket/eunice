// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier"),
	stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	({
		dependsUponProperty,
		functionDeclarationOrExpression,
		hasUndeclaredReferenceTo,
		identifier,
		items,
		type,
	}) => {
		const itemOrItems =
			stackItemsWhenMultiple({
				items:
					[
						...createParameterItemsForFunction({
							functionDeclarationOrExpression,
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
				...type && { type },
				...dependsUponProperty,
				...itemOrItems && { items: itemOrItems },
			}
		);
	};

function createParameterItemsForFunction({
	functionDeclarationOrExpression,
	hasUndeclaredReferenceTo,
}) {
	return (
		functionDeclarationOrExpression.params
		.flatMap(
			getNamesFromDestructureOrIdentifier,
		)
		.filter(
			parameter =>
				hasUndeclaredReferenceTo({
					parent: functionDeclarationOrExpression,
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