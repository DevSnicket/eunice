// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	addClass = require("./addClass"),
	addClassProperty = require("./addClassProperty"),
	addFromAssignmentOfCommonjsExport = require("./commonjs/addFromAssignmentOfExport"),
	addFromCall = require("./addFromCall"),
	addFromCommonjsRequireCallee = require("./commonjs/addFromRequireCallee"),
	addVariables = require("./addVariables"),
	createDeclarations = require("./createDeclarations"),
	createDeclarationsWhenCallOfCommonjsRequire = require("./commonjs/createDeclarationsWhenCallOfRequire"),
	createDependsUponIdentifiers = require("./createDependsUponIdentifiers"),
	createFileExtensionTransformer = require("./createFileExtensionTransformer"),
	createFileItemOrItems = require("./createFileItemOrItems"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	findBlockOrIdentifiableParentInAncestors = require("./findBlockOrIdentifiableParentInAncestors"),
	forFunctions = require("./forFunctions"),
	forModules = require("./forModules"),
	getParentFromAncestors = require("./getParentFromAncestors"),
	splitDependsUponIntoPathHierarchyWithAncestors = require("./splitDependsUponIntoPathHierarchyWithAncestors"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple"),
	throwErrorWhenAnyUnhandled = require("./throwErrorWhenAnyUnhandled");

module.exports =
	({
		directoryPath,
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
					createDependsUponProperty:
						dependsUponIdentifiers.createPropertyAndRemoveIdentifiers,
					declarations,
					hasUndeclaredReferenceTo:
						undeclaredReferences.hasReferenceTo,
				}),
				...forModules({
					addDeclarationsIn:
						declarations.addDeclarationsIn,
					directoryAbsolutePath:
						directoryPath
						&&
						directoryPath.absolute,
					getRelativeWhenFileExists,
					parseJavascript,
					removeExtensionFromFilePath,
					splitDependsUponIntoPathHierarchy,
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
				splitDependsUponIntoPathHierarchy,
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
				removeExtensionFromFilePath,
				splitDependsUponIntoPathHierarchy,
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
							getIsDestructuredAndVariables,
							removeExtensionFromFilePath,
							splitDependsUponIntoPathHierarchy,
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

		function splitDependsUponIntoPathHierarchy(
			dependsUpon,
		) {
			return (
				splitDependsUponIntoPathHierarchyWithAncestors({
					dependsUpon,
					directoryPathRelative:
						directoryPath
						&&
						directoryPath.relative,
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