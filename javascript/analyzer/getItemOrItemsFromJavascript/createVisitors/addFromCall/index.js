// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import addArgumentsToNestedCallMap from "./addArgumentsToNestedCallMap";
import getIdentifierNameFromAndAddOrUpdateReferenceOfParent from "./getIdentifierNameFromAndAddOrUpdateReferenceOfParent";
import getNameFromCallee from "./getNameFromCallee";
import isCalleeIgnoredDefault from "./isCalleeIgnoredDefault";
import isParameterOfParent from "./isParameterOfParent";

export default ({
	addDependsUponIdentifierToParent,
	addUndeclaredReference,
	ancestors,
	callExpression,
	findBlockOrIdentifiableParentInAncestors,
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
					&&
					!isSelf()
				);

				function isSelf() {
					return (
						parent
						&&
						parent.id
						&&
						identifier === parent.id.name
					);
				}
			}
		}
	}
};