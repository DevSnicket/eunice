/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

const
	createWhenRequire = require("./createWhenRequire"),
	getNamesFromIdentifierExpressionWhenDestructure = require("../getNamesFromIdentifierExpressionWhenDestructure");

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
			}

			function whenNotInitializedByFunction() {
				return (
					!isInitializedWithFunction()
					&&
					getIsDestructuredAndVariables()
					.variables
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

			function getIsDestructuredAndVariables() {
				return (
					getIsDestructuredAndVariablesFromIdentifier(
						declaration.id,
					)
				);
			}
		}

		function getIsDestructuredAndVariablesFromIdentifier(
			identifier,
		) {
			return (
				whenDestructured()
				||
				{
					isDestructured: false,
					variables: [ createVariableFromName(identifier.name) ],
				}
			);

			function whenDestructured() {
				const names = getNamesFromIdentifierExpressionWhenDestructure(identifier);

				return (
					names
					&&
					{
						isDestructured: true,
						variables: names.map(createVariableFromName),
					}
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