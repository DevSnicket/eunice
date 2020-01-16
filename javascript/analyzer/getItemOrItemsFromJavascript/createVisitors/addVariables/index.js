// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	createAndAddDeclarations = require("./createAndAddDeclarations"),
	getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier");

module.exports =
	({
		addDeclarationsIn,
		addScopedVariables,
		createWhenCommonjsRequire,
		hasUndeclaredReferenceTo,
		parent,
		parentFunction,
		variableDeclaration,
	}) => {
		if (isScoped())
			getAndAddScopedVariables();
		else
			createAndAddDeclarations({
				addDeclarationsIn,
				createWhenCommonjsRequire,
				hasUndeclaredReferenceTo,
				parentFunction,
				variableDeclaration,
			});

		function isScoped() {
			const forInOrOfStatementTypes =
				[
					"ForInStatement",
					"ForOfStatement",
				];

			return (
				forInOrOfStatementTypes.includes(parent.type)
				||
				inBlockOfFunction()
			);

			function inBlockOfFunction() {
				return (
					parentFunction
					&&
					parentFunction.body !== parent
				);
			}
		}

		function getAndAddScopedVariables() {
			addScopedVariables({
				scope:
					parent,
				variables:
					variableDeclaration.declarations.flatMap(
						({ id }) => getNamesFromDestructureOrIdentifier(id),
					),
			});
		}
	};