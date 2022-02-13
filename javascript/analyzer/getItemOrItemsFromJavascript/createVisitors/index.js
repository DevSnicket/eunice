/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import addClass from "./addClass";
import addClassProperty from "./addClassProperty";
import addFromAssignmentOfCommonjsExport from "./commonjs/addFromAssignmentOfExport";
import addFromCall from "./addFromCall";
import addFromCommonjsRequireCallee from "./commonjs/addFromRequireCallee";
import addVariables from "./addVariables";
import createDeclarations from "./createDeclarations";
import createDeclarationsWhenCallOfCommonjsRequire from "./commonjs/createDeclarationsWhenCallOfRequire";
import createDependsUponIdentifiers from "./createDependsUponIdentifiers";
import createFileExtensionTransformer from "./createFileExtensionTransformer";
import createFileItemOrItems from "./createFileItemOrItems";
import createIndexDependsUponWhenDirectory from "./createIndexDependsUponWhenDirectory";
import createRelativeAwarePathBasedDependsUpon from "./createRelativeAwarePathBasedDependsUpon";
import createScopedVariables from "./createScopedVariables";
import createUndeclaredReferences from "./createUndeclaredReferences";
import findBlockOrIdentifiableParentInAncestorsEh from "./findBlockOrIdentifiableParentInAncestors";
import forFunctions from "./forFunctions";
import forModules from "./forModules";
import getIdentifierFromAssignmentExpressionLeft from "./getIdentifierFromAssignmentExpressionLeft";
import getParentFromAncestors from "./getParentFromAncestors";
import isCommonjsModuleExportProperty from "./commonjs/isModuleExportProperty";
import stackItemsWhenMultiple from "./stackItemsWhenMultiple";
import throwErrorWhenAnyUnhandled from "./throwErrorWhenAnyUnhandled";

export default ({
	directoryPath,
	fileExtensions,
	isCalleeIgnored,
	parseJavascript,
	sortItems,
}) => {
	const
		declarations = createDeclarations(),
		dependsUponIdentifiers = createDependsUponIdentifiers(),
		{
			getRelativeWhenFileExists,
			removeExtensionFromFilePath,
		} = createFileExtensionTransformer(fileExtensions),
		scopedVariables = createScopedVariables(),
		undeclaredReferences = createUndeclaredReferences();

	return (
		{
			...forFunctions({
				createDependsUponProperty:
					dependsUponIdentifiers.createPropertyAndRemoveIdentifiers,
				declarations,
				findBlockOrIdentifiableParentInAncestors,
				hasUndeclaredReferenceTo:
					undeclaredReferences.hasReferenceTo,
				sortItems,
			}),
			...forModules({
				addDeclarationsIn:
					declarations.addDeclarationsIn,
				createPathBasedDependsUpon,
				directoryAbsolutePath:
					directoryPath
					&&
					directoryPath.absolute,
				getRelativeWhenFileExists,
				parseJavascript,
			}),
			AssignmentExpression:
				visitAssignmentExpression,
			CallExpression:
				visitCallExpression,
			ClassDeclaration:
				visitClass,
			ClassExpression:
				visitClass,
			ClassProperty:
				visitClassProperty,
			JSXOpeningElement:
				visitJsxOpeningElement,
			NewExpression:
				visitCallExpression,
			VariableDeclaration:
				visitVariableDeclaration,
			getItemOrItems,
		}
	);

	function visitAssignmentExpression(
		assignmentExpression,
	) {
		addFromAssignmentOfCommonjsExport({
			addDeclarationsIn:
				declarations.addDeclarationsIn,
			assignmentExpression,
			createPathBasedDependsUpon,
		});
	}

	function visitCallExpression(
		callExpression,
		ancestors,
	) {
		addFromCall({
			addDependsUponIdentifierToParent:
				dependsUponIdentifiers.addIdentifierToParent,
			addUndeclaredReference:
				({ parent, reference }) =>
					undeclaredReferences.addAncestorsAndParentOfReference({
						ancestors,
						parent,
						reference,
					}),
			ancestors,
			callExpression,
			findBlockOrIdentifiableParentInAncestors,
			findDeclarationAndParent:
				declarations.findDeclarationAndParent,
			isCalleeIgnored,
			isVariableInBlockScoped:
				variable =>
					scopedVariables.isIn({
						ancestors,
						variable,
					}),
		});

		addFromCommonjsRequireCallee({
			addDependsUponIdentifierToParent:
				dependsUponIdentifiers.addIdentifierToParent,
			ancestors,
			callee:
				callExpression.callee,
			createPathBasedDependsUpon,
			findBlockOrIdentifiableParentInAncestors,
		});
	}

	function visitClass(
		classDeclarationOrExpression,
		ancestors,
	) {
		addClass({
			ancestors,
			classDeclarationOrExpression,
			createDependsUponProperty:
				dependsUponIdentifiers.createPropertyAndRemoveIdentifiers,
			declarations,
			findBlockOrIdentifiableParentInAncestors,
			findDeclarationIn:
				declarations.findDeclarationIn,
		});
	}

	function visitClassProperty(
		classProperty,
		ancestors,
	) {
		addClassProperty({
			ancestors,
			classProperty,
			createDependsUponProperty:
				dependsUponIdentifiers.createPropertyAndRemoveIdentifiers,
			declarations,
		});
	}

	function visitJsxOpeningElement(
		{ name: { name } },
		ancestors,
	) {
		dependsUponIdentifiers.addIdentifierToParent({
			identifier: name,
			parent: findBlockOrIdentifiableParentInAncestors(ancestors),
		});
	}

	function visitVariableDeclaration(
		variableDeclaration,
		ancestors,
	) {
		addVariables({
			addDeclarationsIn:
				declarations.addDeclarationsIn,
			addScopedVariables:
				scopedVariables.add,
			createWhenCommonjsRequire:
				({
					callOrMemberOfCallExpression,
					getIsDestructuredAndVariables,
				}) =>
					createDeclarationsWhenCallOfCommonjsRequire({
						callOrMemberOfCallExpression,
						createPathBasedDependsUpon,
						directoryAbsolutePath:
							directoryPath
							&&
							directoryPath.absolute,
						getIsDestructuredAndVariables,
					}),
			hasUndeclaredReferenceTo:
				undeclaredReferences.hasReferenceTo,
			parent:
				getParentFromAncestors(ancestors),
			parentFunction:
				findBlockOrIdentifiableParentInAncestors(ancestors),
			variableDeclaration,
		});
	}

	function createPathBasedDependsUpon({
		items,
		path: targetPath,
	}) {
		return (
			createRelativeAwarePathBasedDependsUpon({
				items:
					createIndexDependsUponWhenDirectory({
						directoryAbsolutePath:
							directoryPath
							&&
							directoryPath.absolute,
						fileOrDirectoryPath:
							targetPath,
						items,
					}),
				sourceDirectoryRelativePath:
					directoryPath
					&&
					directoryPath.relative,
				targetPath:
					removeExtensionFromFilePath(targetPath),
			})
		);
	}

	function findBlockOrIdentifiableParentInAncestors(
		ancestors,
	) {
		return (
			findBlockOrIdentifiableParentInAncestorsEh({
				ancestors,
				isIdentifiableAssignmentExpressionLeft:
					left =>
						getIdentifierFromAssignmentExpressionLeft(left)
						||
						isCommonjsModuleExportProperty(left),
			})
		);
	}

	function getItemOrItems() {
		const dependsUponProperty =
			dependsUponIdentifiers.createPropertyAndRemoveIdentifiers(
				{ parent: null },
			);

		const itemOrItems =
			createFileItemOrItems({
				dependsUponProperty,
				items:
					stackItemsWhenMultiple({
						items:
							sortItems(
								declarations.createItemsForAndRemoveDeclarationsIn(
									null,
								),
							),
						withSingleInArray:
							!dependsUponProperty,
					}),
			});

		throwErrorWhenAnyUnhandled({
			declarations:
				[ ...declarations.getGroupedByParent() ],
			dependsUponIdentifiers:
				[ ...dependsUponIdentifiers.getGroupedByParent() ],
		});

		return itemOrItems;
	}
};