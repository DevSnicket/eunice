/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ findIdentifiableParent } = require("./parentFunctionsFromAncestors"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple");

module.exports =
	({
		ancestors,
		classDeclarationOrExpression,
		declarations,
	}) => {
		const properties =
			[
				...createDependsUponProperty(),
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

		function * createDependsUponProperty() {
			if (classDeclarationOrExpression.superClass)
				yield { dependsUpon: classDeclarationOrExpression.superClass.name };
		}

		function * createIdProperty() {
			if (classDeclarationOrExpression.id)
				yield { id: classDeclarationOrExpression.id.name };
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