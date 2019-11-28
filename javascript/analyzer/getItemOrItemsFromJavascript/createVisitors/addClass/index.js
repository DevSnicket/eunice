// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDependsUponProperty = require("./createDependsUponProperty"),
	createItemsProperty = require("./createItemsProperty"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	getParentFromAncestors = require("../getParentFromAncestors");

module.exports =
	({
		ancestors,
		classDeclarationOrExpression,
		createDependsUponPropertyForParent,
		declarations:
			{
				addDeclarationIn,
				createItemsForAndRemoveDeclarationsIn,
			},
	}) =>
		addWhenAnyProperties({
			addDeclarationIn,
			ancestors,
			properties:
				[
					...createIdentifierProperty({
						ancestors,
						identifier:
							classDeclarationOrExpression.id,
					}),
					...createDependsUponProperty({
						classDeclarationOrExpression,
						createDependsUponPropertyForParent,
					}),
					...createItemsProperty({
						classDeclarationOrExpression,
						createItemsForAndRemoveDeclarationsIn,
					}),
				],
		});

function * createIdentifierProperty({
	ancestors,
	identifier,
}) {
	if (identifier)
		yield { id: identifier.name };
	else {
		const parent = getParentFromAncestors(ancestors);

		if (parent.type === "VariableDeclarator")
			yield { id: parent.id.name };
	}
}

function addWhenAnyProperties({
	addDeclarationIn,
	ancestors,
	properties,
}) {
	if (properties.length)
		addDeclarationIn({
			declaration:
				Object.assign(
					{},
					...properties,
				),
			parent:
				findBlockOrIdentifiableParent(ancestors),
		});
}