// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import createItemsProperty from "../createItemsProperty";
import getNamesFromDestructureOrIdentifier from "../getNamesFromDestructureOrIdentifier";

export default ({
	dependsUponProperty,
	functionDeclarationOrExpression,
	hasUndeclaredReferenceTo,
	identifier,
	items,
	sortItems,
	type,
}) => (
	{
		...identifier && { id: identifier },
		...type && { type },
		...dependsUponProperty,
		...createItemsProperty(
			sortItems(
				[
					...createParameterItemsForFunction({
						functionDeclarationOrExpression,
						hasUndeclaredReferenceTo,
					}),
					...items || [],
				],
			),
		),
	}
);

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