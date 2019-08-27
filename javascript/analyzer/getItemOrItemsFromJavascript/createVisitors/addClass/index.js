// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDependsUponPropertyFromBaseAndConstructor = require("./createDependsUponPropertyFromBaseAndConstructor"),
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
	}) => {
		const constructor =
			findConstructorInClass(
				classDeclarationOrExpression,
			);

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
					...createDependsUponPropertyFromBaseAndConstructor({
						constructor,
						createDependsUponPropertyForParent,
						superClass:
							classDeclarationOrExpression.superClass,
					}),
					...createItemsProperty({
						classDeclarationOrExpression,
						constructor,
						createItemsForAndRemoveDeclarationsIn,
					}),
				],
		});
	};

function findConstructorInClass(
	{ body },
) {
	return (
		body.body
		.find(({ kind }) => kind === "constructor")
	);
}

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