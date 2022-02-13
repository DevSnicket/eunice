/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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