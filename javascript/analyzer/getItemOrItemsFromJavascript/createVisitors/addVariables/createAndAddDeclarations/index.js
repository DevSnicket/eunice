/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

const
	createWhenRequire = require("./createWhenRequire"),
	getNamesFromDestructureOrIdentifier = require("../../getNamesFromDestructureOrIdentifier");

module.exports =
	({
		addDeclarationsIn,
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
					createWhenRequire({
						getIsDestructuredAndVariables,
						initialization:
							declaration.init,
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
						isFunctionType(
							declaration.init.type,
						)
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

function isFunctionType(
	type,
) {
	return (
		type === "ArrowFunctionExpression"
		||
		type === "FunctionDeclaration"
		||
		type === "FunctionExpression"
	);
}