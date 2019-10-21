// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	addArgumentsToNestedCallMap = require("./addArgumentsToNestedCallMap"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./getIdentifierNameFromAndAddOrUpdateReferenceOfParent"),
	getNameFromCallee = require("./getNameFromCallee"),
	getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier"),
	isCalleeIgnoredDefault = require("./isCalleeIgnoredDefault");

module.exports =
	({
		addDependsUponIdentifierToParent,
		addUndeclaredReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunctions,
		isCalleeIgnored = isCalleeIgnoredDefault,
		isVariableInBlockScoped,
		removeExtensionFromFilePath,
	}) => {
		const calleeName =
			getNameFromCallee({
				callee: callExpression.callee,
				removeExtensionFromFilePath,
			});

		if (calleeName)
			addFromParentFunctions(
				findParentFunctions(),
			);

		function addFromParentFunctions(
			parentFunctions,
		) {
			addDependsUponIdentifier(
				getIdentifierNameFromAndAddOrUpdateReference(
					calleeName,
				),
			);

			addArgumentsToNestedCallMap({
				addDependsUponIdentifier,
				callExpression,
				getIdentifierNameFromAndAddOrUpdateReference,
			});

			function getIdentifierNameFromAndAddOrUpdateReference(
				reference,
			) {
				return (
					!isCalleeIgnored(reference)
					&&
					getIdentifierNameFromAndAddOrUpdateReferenceOfParent({
						addUndeclaredReference,
						findDeclarationAndParent,
						parentFunctions,
						reference,
					})
				);
			}

			function addDependsUponIdentifier(
				identifier,
			) {
				if (isIdentifierRelevant())
					addDependsUponIdentifierToParent({
						identifier,
						parent: getParent(),
					});

				function isIdentifierRelevant() {
					return (
						identifier
						&&
						!isVariableInBlockScoped(identifier)
						&&
						!isParameterOfAnyParentFunction(identifier)
					);
				}

				function getParent() {
					return whenBlockOrIdentifiable() || null;

					function whenBlockOrIdentifiable() {
						return (
							parentFunctions
							&&
							parentFunctions.blockOrIdentifiable
						);
					}
				}
			}

			function isParameterOfAnyParentFunction(
				name,
			) {
				return (
					parentFunctions
					&&
					(ofBlockOrIdentifiable() || ofAnonymous())
				);

				function ofBlockOrIdentifiable() {
					return (
						parentFunctions.blockOrIdentifiable
						&&
						isParameterOfParentFunction(parentFunctions.blockOrIdentifiable)
					);
				}

				function ofAnonymous() {
					return (
						parentFunctions.anonymous
						&&
						parentFunctions.anonymous.some(isParameterOfParentFunction)
					);
				}

				function isParameterOfParentFunction(
					parentFunction,
				) {
					return (
						parentFunction.params
						.flatMap(getNamesFromDestructureOrIdentifier)
						.includes(name)
					);
				}
			}
		}
	};