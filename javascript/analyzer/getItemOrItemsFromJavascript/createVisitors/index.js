// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	addClass = require("./addClass"),
	addFromAssignmentOfCommonjsExport = require("./commonjs/addFromAssignmentOfExport"),
	addFromCall = require("./addFromCall"),
	addVariables = require("./addVariables"),
	createDeclarations = require("./createDeclarations"),
	createDependsUponIdentifiers = require("./createDependsUponIdentifiers"),
	createFileExtensionTransformer = require("./createFileExtensionTransformer"),
	createFileItemOrItems = require("./createFileItemOrItems"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	forFunctions = require("./forFunctions"),
	forModules = require("./forModules"),
	getParentFromAncestors = require("./getParentFromAncestors"),
	parentFunctionsFromAncestors = require("./parentFunctionsFromAncestors"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple"),
	throwErrorWhenAnyUnhandled = require("./throwErrorWhenAnyUnhandled");

module.exports =
	({
		directoryAbsolutePath,
		fileExtensions,
		isCalleeIgnored,
		parseJavascript,
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
					createDependsUponPropertyForParent:
						dependsUponIdentifiers.createPropertyForParent,
					declarations,
					hasUndeclaredReferenceTo:
						undeclaredReferences.hasReferenceTo,
				}),
				...forModules({
					addDeclarationsIn:
						declarations.addDeclarationsIn,
					directoryAbsolutePath,
					getRelativeWhenFileExists,
					parseJavascript,
					removeExtensionFromFilePath,
				}),
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

		function visitAssignmentExpression(
			assignmentExpression,
		) {
			addFromAssignmentOfCommonjsExport({
				addDeclarationsIn:
					declarations.addDeclarationsIn,
				assignmentExpression,
				removeExtensionFromFilePath,
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
				isCalleeIgnored,
				isVariableInBlockScoped:
					variable =>
						scopedVariables.isIn({
							ancestors,
							variable,
						}),
				removeExtensionFromFilePath,
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
					parentFunctionsFromAncestors.findBlockOrIdentifiableParent(ancestors),
				removeExtensionFromFilePath,
				variableDeclaration,
			});
		}

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
	};