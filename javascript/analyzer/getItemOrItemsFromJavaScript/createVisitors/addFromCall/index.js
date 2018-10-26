const
	addArgumentsToNestedCallMap = require("./addArgumentsToNestedCallMap"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./getIdentifierNameFromAndAddOrUpdateReferenceOfParent"),
	getPropertyName = require("../getPropertyName");

module.exports =
	({
		addDependsUponIdentifierFrom,
		addUndeclaredReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunctions,
		isVariableInBlockScoped,
	}) => {
		const calleeName = getCalleeName();

		if (calleeName && calleeName !== "require")
			addFromParentFunctions(
				findParentFunctions(),
			);

		function getCalleeName() {
			return (
				getRequireWhenCalled()
				||
				callExpression.callee.name
			);
		}

		function getRequireWhenCalled() {
			return (
				callExpression.callee.callee
				&&
				callExpression.callee.callee.name === "require"
				&&
				callExpression.callee.arguments[0].value
			);
		}

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
					addDependsUponIdentifierFrom({
						identifier,
						parent: parentFunctions && (parentFunctions.identifiable || null),
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
			}

			function isParameterOfAnyParentFunction(
				name,
			) {
				return (
					parentFunctions
					&&
					(ofIdentifiable() || ofAnonymous())
				);

				function ofIdentifiable() {
					return (
						parentFunctions.identifiable
						&&
						isParameterOfParentFunction(parentFunctions.identifiable)
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
						parentFunction.params.some(
							parameter =>
								parameter.type === "ObjectPattern"
								?
								parameter.properties.some(property => getPropertyName(property) === name)
								:
								parameter.name === name,
						)
					);
				}
			}
		}
	};