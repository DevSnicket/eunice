// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemsProperty = require("./createItemsProperty"),
	getParentFromAncestors = require("./getParentFromAncestors");

module.exports =
	({
		ancestors,
		classDeclarationOrExpression,
		createDependsUponProperty,
		declarations:
			{
				addDeclarationIn,
				createItemsForAndRemoveDeclarationsIn,
			},
		findBlockOrIdentifiableParentInAncestors,
	}) =>
		addWhenAnyProperties({
			addDeclarationIn,
			ancestors,
			declaration:
				{
					...createIdentifierProperty({
						ancestors,
						identifier:
							classDeclarationOrExpression.id,
					}),
					...createDependsUponProperty({
						identifiers:
							getBaseIdentifiers(classDeclarationOrExpression),
						parent:
							classDeclarationOrExpression,
					}),
					...createItemsProperty(
						createItemsForAndRemoveDeclarationsIn(
							classDeclarationOrExpression,
						),
					),
				},
			findBlockOrIdentifiableParentInAncestors,
		});

function createIdentifierProperty({
	ancestors,
	identifier,
}) {
	if (identifier)
		return { id: identifier.name };
	else {
		const parent = getParentFromAncestors(ancestors);

		return (
			parent.type === "VariableDeclarator"
			&&
			{ id: parent.id.name }
		);
	}
}

function * getBaseIdentifiers(
	classDeclarationOrExpression,
) {
	const base =
		classDeclarationOrExpression.superClass
		&&
		classDeclarationOrExpression.superClass.name;

	if (base)
		yield base;
}

function addWhenAnyProperties({
	addDeclarationIn,
	ancestors,
	declaration,
	findBlockOrIdentifiableParentInAncestors,
}) {
	if (Object.entries(declaration).length)
		addDeclarationIn({
			declaration,
			parent: findBlockOrIdentifiableParentInAncestors(ancestors),
		});
}