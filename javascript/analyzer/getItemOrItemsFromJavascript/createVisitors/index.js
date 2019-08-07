/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	addClass = require("./addClass"),
	addFromCall = require("./addFromCall"),
	addVariables = require("./addVariables"),
	addWhenCommonjsExportAlias = require("./commonjs/addWhenExportAlias"),
	createDeclarations = require("./createDeclarations"),
	createDependsUponIdentifiers = require("./createDependsUponIdentifiers"),
	createFileItemOrItems = require("./createFileItemOrItems"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	forFunctions = require("./forFunctions"),
	forModulesWithAddDeclarationsIn = require("./forModulesWithAddDeclarationsIn"),
	getParentFromAncestors = require("./getParentFromAncestors"),
	parentFunctionsFromAncestors = require("./parentFunctionsFromAncestors"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple"),
	throwErrorWhenAnyUnhandled = require("./throwErrorWhenAnyUnhandled");

module.exports =
	({ ignoreStaticMethodsOf }) => {
		const
			declarations = createDeclarations(),
			dependsUponIdentifiers = createDependsUponIdentifiers(),
			scopedVariables = createScopedVariables(),
			undeclaredReferences = createUndeclaredReferences();

		return (
			{
				...forFunctions({
					createDependsUponPropertyForParent:
						dependsUponIdentifiers.createPropertyForParent,
					declarations,
					hasUndeclaredReferenceTo:
						undeclaredReferences.hasReferenceTo,
				}),
				...forModulesWithAddDeclarationsIn(
					declarations.addDeclarationsIn,
				),
				AssignmentExpression:
					visitAssignmentExpression,
				CallExpression:
					visitCallExpression,
				ClassDeclaration:
					visitClass,
				ClassExpression:
					visitClass,
				NewExpression:
					visitCallExpression,
				VariableDeclaration:
					visitVariableDeclaration,
				getItemOrItems,
			}
		);

		function getItemOrItems() {
			const dependsUponProperty =
				dependsUponIdentifiers.createPropertyForParent(
					{ parent: null },
				);

			const itemOrItems =
				createFileItemOrItems({
					dependsUponProperty,
					items:
						stackItemsWhenMultiple({
							items:
								declarations.createItemsForAndRemoveDeclarationsIn(null),
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

		function visitAssignmentExpression(
			assignmentExpression,
			ancestors,
		) {
			addWhenCommonjsExportAlias({
				addDeclarationIn:
					declarations.addDeclarationIn,
				ancestors,
				assignmentExpression,
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
				callExpression,
				findDeclarationAndParent:
					declarations.findDeclarationAndParent,
				findParentFunctions:
					() => parentFunctionsFromAncestors.findParents(ancestors),
				ignoreStaticMethodsOf,
				isVariableInBlockScoped:
					variable =>
						scopedVariables.isIn({
							ancestors,
							variable,
						}),
			});
		}

		function visitClass(
			classDeclarationOrExpression,
			ancestors,
		) {
			addClass({
				ancestors,
				classDeclarationOrExpression,
				createDependsUponPropertyForParent:
					dependsUponIdentifiers.createPropertyForParent,
				declarations,
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
				hasUndeclaredReferenceTo:
					undeclaredReferences.hasReferenceTo,
				parent:
					getParentFromAncestors(ancestors),
				parentFunction:
					parentFunctionsFromAncestors.findIdentifiableParent(ancestors),
				variableDeclaration,
			});
		}
	};