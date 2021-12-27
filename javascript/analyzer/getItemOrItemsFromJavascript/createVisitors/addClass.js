// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemsProperty from "./createItemsProperty";
import getParentFromAncestors from "./getParentFromAncestors";

export default ({
	ancestors,
	classDeclarationOrExpression,
	createDependsUponProperty,
	declarations:
		{
			addDeclarationIn,
			createItemsForAndRemoveDeclarationsIn,
		},
	findBlockOrIdentifiableParentInAncestors,
	findDeclarationIn,
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
						setBaseAsExtensionAndGetIdentifiers({
							classDeclarationOrExpression,
							findDeclarationIn,
						}),
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

function * setBaseAsExtensionAndGetIdentifiers({
	classDeclarationOrExpression,
	findDeclarationIn,
}) {
	const base =
		classDeclarationOrExpression.superClass
		&&
		classDeclarationOrExpression.superClass.name;

	if (base) {
		setBaseAsExtension();

		yield base;
	}

	function setBaseAsExtension() {
		const baseDeclaration =
			findDeclarationIn({
				parent: null,
				predicate: declaration => declaration.id === base,
			});

		if (baseDeclaration)
			baseDeclaration.isExtensionOfClass = true;
	}
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