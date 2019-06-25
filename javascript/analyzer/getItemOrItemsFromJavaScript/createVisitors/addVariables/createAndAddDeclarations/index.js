/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createWhenRequire = require("./createWhenRequire");

module.exports =
	({
		addDeclarationsIn,
		getNamesFromIdentifierExpressionWhenObjectPattern,
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
				.reduce(
					(declarations, declaration) =>
						[
							...declarations,
							...createFromDeclarationIfInitialized(declaration) || [],
						],
					[],
				)
			);
		}

		function createFromDeclarationIfInitialized(
			declaration,
		) {
			return (
				declaration.init
				&&
				createFromDeclaration()
			);

			function createFromDeclaration() {
				return (
					createWhenRequire({
						createVariablesFromIdentifier,
						initialization: declaration.init,
					})
					||
					createWhenNotFunction()
				);
			}

			function createWhenNotFunction() {
				return (
					!isFunctionType(
						declaration.init.type,
					)
					&&
					createVariablesFromIdentifier()
				);
			}

			function createVariablesFromIdentifier() {
				return (
					createVariablesFromIsDestructuredAndNames(
						getIsDestructuredAndNamesOfIdentifier(
							declaration.id,
						),
					)
				);
			}
		}

		function getIsDestructuredAndNamesOfIdentifier(
			identifier,
		) {
			return (
				getWhenObjectPattern()
				||
				{
					isDestructured: false,
					names: [ identifier.name ],
				}
			);

			function getWhenObjectPattern() {
				const names = getNamesFromIdentifierExpressionWhenObjectPattern(identifier);

				return (
					names
					&&
					{
						isDestructured: true,
						names,
					}
				);
			}
		}

		function createVariablesFromIsDestructuredAndNames({
			isDestructured,
			names,
		}) {
			return (
				names
				.map(
					name => (
						{
							...isDestructured && { dependsUpon: name },
							id:
								name,
							isUsedInNestedFunction:
								hasUndeclaredReferenceTo({
									parent: parentFunction,
									reference: name,
								}),
							type:
								"variable",
						}
					),
				)
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