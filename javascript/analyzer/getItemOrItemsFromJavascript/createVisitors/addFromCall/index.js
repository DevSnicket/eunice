// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	addArgumentsToNestedCallMap = require("./addArgumentsToNestedCallMap"),
	findBlockOrIdentifiableParentInAncestors = require("../findBlockOrIdentifiableParentInAncestors"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./getIdentifierNameFromAndAddOrUpdateReferenceOfParent"),
	getNameFromCallee = require("./getNameFromCallee"),
	isCalleeIgnoredDefault = require("./isCalleeIgnoredDefault"),
	isParameterOfParent = require("./isParameterOfParent");

module.exports =
	({
		addDependsUponIdentifierToParent,
		addUndeclaredReference,
		ancestors,
		callExpression,
		findDeclarationAndParent,
		isCalleeIgnored = isCalleeIgnoredDefault,
		isVariableInBlockScoped,
	}) => {
		const calleeName = getNameFromCallee(callExpression.callee);

		if (calleeName)
			addToParent(
				findBlockOrIdentifiableParentInAncestors(ancestors),
			);

		function addToParent(
			parent,
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
						parent,
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
						parent,
					});

				function isIdentifierRelevant() {
					return (
						identifier
						&&
						!isVariableInBlockScoped(identifier)
						&&
						!isParameterOfParent({
							ancestors,
							name: identifier,
						})
					);
				}
			}
		}
	};