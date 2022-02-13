/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

import getNamesFromDestructureOrIdentifier from "../getNamesFromDestructureOrIdentifier";
import hasTypeOfFunction from "../hasTypeOfFunction";

export default ({
	addDeclarationsIn,
	createWhenCommonjsRequire,
	hasUndeclaredReferenceTo,
	parentFunction,
	variableDeclaration,
}) => {
	addDeclarationsWhenAny(
		createDeclarations(),
	);

	function createDeclarations() {
		return (
			variableDeclaration.declarations
			.flatMap(
				declaration =>
					createFromDeclaration(declaration)
					||
					[],
			)
		);
	}

	function createFromDeclaration(
		declaration,
	) {
		return (
			whenInitializedByRequire()
			||
			whenNotInitializedByFunction()
		);

		function whenInitializedByRequire() {
			return (
				declaration.init
				&&
				createWhenCommonjsRequire({
					callOrMemberOfCallExpression:
						declaration.init,
					getIsDestructuredAndVariables,
				})
			);

			function getIsDestructuredAndVariables() {
				return (
					{
						isDestructured: isDestructured(),
						variables: getVariables(),
					}
				);

				function isDestructured() {
					return (
						[ "ArrayPattern", "ObjectPattern" ]
						.includes(declaration.id.type)
					);
				}
			}
		}

		function whenNotInitializedByFunction() {
			return (
				!isInitializedWithFunction()
				&&
				getVariables()
			);

			function isInitializedWithFunction() {
				return (
					declaration.init
					&&
					hasTypeOfFunction(declaration.init)
				);
			}
		}

		function getVariables() {
			return (
				getNamesFromDestructureOrIdentifier(declaration.id)
				.map(createVariableFromName)
			);
		}
	}

	function createVariableFromName(
		name,
	) {
		return (
			{
				id:
					name,
				isCalledFromNestedFunction:
					hasUndeclaredReferenceTo({
						parent: parentFunction,
						reference: name,
					}),
				type:
					"variable",
			}
		);
	}

	function addDeclarationsWhenAny(
		declarations,
	) {
		if (declarations.length)
			addDeclarationsIn({
				declarations,
				parent:
					parentFunction,
			});
	}
};