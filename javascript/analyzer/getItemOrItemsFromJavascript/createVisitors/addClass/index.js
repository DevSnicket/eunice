/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDependsUponPropertyFromBaseAndConstructor = require("./createDependsUponPropertyFromBaseAndConstructor"),
	createItemsProperty = require("./createItemsProperty"),
	{ findIdentifiableParent } = require("../parentFunctionsFromAncestors"),
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
				findIdentifiableParent(ancestors),
		});
}