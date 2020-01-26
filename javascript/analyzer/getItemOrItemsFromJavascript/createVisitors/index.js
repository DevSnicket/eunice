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
	createRelativeAwarePathBasedDependsUpon = require("./createRelativeAwarePathBasedDependsUpon"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	findBlockOrIdentifiableParentInAncestorsEh = require("./findBlockOrIdentifiableParentInAncestors"),
	forFunctions = require("./forFunctions"),
	forModules = require("./forModules"),
	getIdentifierFromAssignmentExpressionLeft = require("./getIdentifierFromAssignmentExpressionLeft"),
	getParentFromAncestors = require("./getParentFromAncestors"),
	isCommonjsModuleExportProperty = require("./commonjs/isModuleExportProperty"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple"),
	throwErrorWhenAnyUnhandled = require("./throwErrorWhenAnyUnhandled");

module.exports =
	({
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
				createPathBasedDependsUpon,
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
				directoryAbsolutePath:
					directoryPath
					&&
					directoryPath.absolute,
				findBlockOrIdentifiableParentInAncestors,
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
				createDependsUponProperty:
					dependsUponIdentifiers.createPropertyAndRemoveIdentifiers,
				declarations,
				findBlockOrIdentifiableParentInAncestors,
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
							createPathBasedDependsUpon,
							directoryAbsolutePath:
								directoryPath
								&&
								directoryPath.absolute,
							getIsDestructuredAndVariables,
							removeExtensionFromFilePath,
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
					items,
					sourceDirectoryRelativePath:
						directoryPath
						&&
						directoryPath.relative,
					targetPath,
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