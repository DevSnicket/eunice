// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier"),
	hasTypeOfFunction = require("../hasTypeOfFunction");

module.exports =
	({
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