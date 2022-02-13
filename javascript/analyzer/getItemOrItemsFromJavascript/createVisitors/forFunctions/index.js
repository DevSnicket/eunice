/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDeclarationForFunction from "./createDeclarationForFunction";
import getIdentifierAndParentAndTypeForFunctionExpression from "./getIdentifierAndParentAndTypeForFunctionExpression";
import getIdentifierAndParentAndTypeForFunctionExpressionParentWhenCommonjsExport from "../commonjs/getIdentifierAndParentAndTypeForFunctionExpressionParentWhenExport";
import getIdentifierAndParentAndTypeForFunctionExpressionWhenModuleExport from "../forModules/getIdentifierAndParentAndTypeForFunctionExpressionWhenExport";
import getParentFromAncestors from "../getParentFromAncestors";
import getTypeWhenModuleExportDeclarationType from "../forModules/getTypeWhenExportDeclarationType";

export default ({
	createDependsUponProperty,
	declarations,
	findBlockOrIdentifiableParentInAncestors,
	hasUndeclaredReferenceTo,
	sortItems,
}) => {
	return (
		{
			ArrowFunctionExpression: visitFunctionExpression,
			FunctionDeclaration: visitFunctionDeclaration,
			FunctionExpression: visitFunctionExpression,
		}
	);

	function visitFunctionDeclaration(
		functionDeclaration,
		ancestors,
	) {
		declarations.addDeclarationIn({
			declaration:
				createDeclarationForFunctionWithDependsUponAndItems({
					functionDeclarationOrExpression:
						functionDeclaration,
					identifier:
						functionDeclaration.id
						&&
						functionDeclaration.id.name,
					type:
						getTypeWhenModuleExportDeclarationType(
							getParentFromAncestors(
								ancestors,
							).type,
						),
				}),
			parent:
				findBlockOrIdentifiableParentInAncestors(ancestors),
		});
	}

	function visitFunctionExpression(
		functionExpression,
		ancestors,
	) {
		addIdentifierAndParentAndType(
			getIdentifierAndParentAndType(),
		);

		function getIdentifierAndParentAndType() {
			// Most getIdentifierAndParentAndTypeForFunctionExpression functions need the parent.
			const parent = getParentFromAncestors(ancestors);

			return (
				getIdentifierAndParentAndTypeForFunctionExpressionParentWhenCommonjsExport(
					parent,
				)
				||
				getIdentifierAndParentAndTypeForFunctionExpressionWhenModuleExport({
					ancestors,
					parent,
				})
				||
				getIdentifierAndParentAndTypeForFunctionExpression({
					ancestors,
					findBlockOrIdentifiableParentInAncestors,
					functionExpression,
					parent,
				})
			);
		}

		function addIdentifierAndParentAndType(
			identifierAndParentAndType,
		) {
			if (identifierAndParentAndType)
				declarations.addDeclarationIn({
					declaration:
						createDeclarationForFunctionWithDependsUponAndItems({
							functionDeclarationOrExpression:
								functionExpression,
							identifier:
								identifierAndParentAndType.identifier,
							type:
								identifierAndParentAndType.type,
						}),
					parent:
						identifierAndParentAndType.parent || null,
				});
		}
	}

	function createDeclarationForFunctionWithDependsUponAndItems({
		functionDeclarationOrExpression,
		identifier,
		type,
	}) {
		return (
			createDeclarationForFunction({
				dependsUponProperty:
					createDependsUponProperty(
						{ parent: functionDeclarationOrExpression },
					),
				functionDeclarationOrExpression,
				hasUndeclaredReferenceTo,
				identifier,
				items:
					declarations.createItemsForAndRemoveDeclarationsIn(
						functionDeclarationOrExpression,
					),
				sortItems,
				type,
			})
		);
	}
};