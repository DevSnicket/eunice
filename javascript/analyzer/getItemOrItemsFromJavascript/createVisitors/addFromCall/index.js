/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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