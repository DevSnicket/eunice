/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDependsUponPropertyFromBaseAndConstructor = require("./createDependsUponPropertyFromBaseAndConstructor"),
	{ findIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	getParentFromAncestors = require("../getParentFromAncestors"),
	stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	({
		ancestors,
		classDeclarationOrExpression,
		createDependsUponPropertyForParent,
		declarations,
	}) => {
		const properties =
			[
				...createDependsUponPropertyFromBaseAndConstructor({
					classDeclarationOrExpression,
					createDependsUponPropertyForParent,
				}),
				...createIdProperty(),
				...createItemsProperty(),
			];

		if (properties.length)
			declarations.addDeclarationIn({
				declaration:
					Object.assign(
						{},
						...properties,
					),
				parent:
					findIdentifiableParent(ancestors),
			});

		function * createIdProperty() {
			if (classDeclarationOrExpression.id)
				yield { id: classDeclarationOrExpression.id.name };
			else {
				const parent = getParentFromAncestors(ancestors);

				if (parent.type === "VariableDeclarator")
					yield { id: parent.id.name };
			}
		}

		function * createItemsProperty() {
			const items =
				stackItemsWhenMultiple({
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							classDeclarationOrExpression,
						),
					withSingleInArray:
						false,
				});

			if (items)
				yield { items };
		}
	};