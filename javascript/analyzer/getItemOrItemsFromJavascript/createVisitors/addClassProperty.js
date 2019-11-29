// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createItemsProperty = require("./createItemsProperty");

module.exports =
	({
		ancestors,
		classProperty,
		createDependsUponProperty,
		declarations:
			{
				addDeclarationIn,
				createItemsForAndRemoveDeclarationsIn,
			},
	}) => {
		if (!isFunction(classProperty))
			addDeclarationIn({
				declaration: createDeclaration(),
				parent: getParentClass(),
			});

		function createDeclaration() {
			return (
				{
					id: classProperty.key.name,
					...createDependsUponProperty(
						{ parent: classProperty },
					),
					...createItemsProperty(
						createItemsForAndRemoveDeclarationsIn(
							classProperty,
						),
					),
				}
			);
		}

		function getParentClass() {
			return ancestors[ancestors.length - 3];
		}
	};

function isFunction(
	{ value },
) {
	return (
		value
		&&
		[ "ArrowFunctionExpression", "FunctionExpression" ]
		.includes(value.type)
	);
}