const
	addArgumentsToNestedCallMap = require("./addFromCall/addArgumentsToNestedCallMap"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./addFromCall/getIdentifierNameFromAndAddOrUpdateReferenceOfParent");

module.exports =
	({
		addDependsUponIdentifierFrom,
		addUndeclaredReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunctions,
	}) => {
		const calleeName = getCalleeName();

		if (calleeName && calleeName !== "require")
			addFromParentFunction(
				findParentFunctions()
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

		function addFromParentFunction(
			parentFunctions
		) {
			addDependsUponIdentifier(
				getIdentifierNameFromAndAddOrUpdateReference(
					calleeName
				)
			);

			addArgumentsToNestedCallMap({
				addDependsUponIdentifier,
				callExpression,
				getIdentifierNameFromAndAddOrUpdateReference,
			});

			function getIdentifierNameFromAndAddOrUpdateReference(
				reference
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
				identifier
			) {
				if (identifier && !isParameterOfAnyParentFunction(identifier))
					addDependsUponIdentifierFrom({
						identifier,
						parent: parentFunctions && (parentFunctions.identifiable || null),
					});
			}

			function isParameterOfAnyParentFunction(
				name
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
					parentFunction
				) {
					return (
						parentFunction.params.some(
							parameter =>
								parameter.type === "ObjectPattern"
								?
								parameter.properties.some(property => property.key.name === name)
								:
								parameter.name === name
						)
					);
				}
			}
		}
	};