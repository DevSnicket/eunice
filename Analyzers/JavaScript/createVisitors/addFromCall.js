module.exports =
	({
		addDependsUponIdentifierFrom,
		addUndeclaredVariableNameReference,
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
				getIdentifierNameFromAndAddOrUpdateVariable(
					calleeName
				)
			);

			addArgumentsToNestedCallMap({
				addDependsUponIdentifier,
				callExpression,
				getIdentifierNameFromAndAddOrUpdateVariable,
				parentFunctions,
			});

			function getIdentifierNameFromAndAddOrUpdateVariable(
				variableName
			) {
				return (
					getIdentifierNameFromAndAddOrUpdateVariableOfParent({
						addUndeclaredVariableNameReference,
						findDeclarationAndParent,
						parentFunctions,
						variableName,
					})
				);
			}

			function addDependsUponIdentifier(
				identifier
			) {
				if (identifier)
					addDependsUponIdentifierFrom({
						identifier,
						parent: parentFunctions && (parentFunctions.identifiable || null),
					});
			}
		}
	};

function addArgumentsToNestedCallMap({
	addDependsUponIdentifier,
	callExpression,
	getIdentifierNameFromAndAddOrUpdateVariable,
	parentFunctions,
}) {
	for (const argument of getArguments())
		addDependsUponIdentifier(
			getIdentifierFromArgumentWhenRelevant(
				argument
			)
		);

	function getArguments() {
		return (
			callExpression.arguments.reduce(
				(aggregation, argument) =>
					argument.type === "ObjectExpression"
					?
					[ ...aggregation, ...getPropertyValues(argument.properties) ]
					:
					[ ...aggregation, argument ],
				[]
			)
		);
	}

	function getPropertyValues(
		properties
	) {
		return (
			properties
			.map(
				property =>
					property.type === "SpreadElement"
					?
					property.argument
					:
					property.value
			)
		);
	}

	function getIdentifierFromArgumentWhenRelevant(
		argument
	) {
		return (
			argument.type === "Identifier"
			&&
			!isParameterOfAnyParentFunction()
			&&
			getIdentifierNameFromAndAddOrUpdateVariable(
				argument.name
			)
		);

		function isParameterOfAnyParentFunction() {
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
		}

		function isParameterOfParentFunction(
			parentFunction
		) {
			return (
				parentFunction.params.some(
					parameter =>
						parameter.type === "ObjectPattern"
						?
						parameter.properties.some(property => property.key.name === argument.name)
						:
						parameter.name === argument.name
				)
			);
		}
	}
}

function getIdentifierNameFromAndAddOrUpdateVariableOfParent({
	addUndeclaredVariableNameReference,
	findDeclarationAndParent,
	parentFunctions,
	variableName,
}) {
	const declarationAndParent =
		findDeclarationAndParent(
			isVariable
		);

	if (declarationAndParent)
		return getNameFromDeclaration();
	else {
		addUndeclaredVariableNameReference(
			variableName
		);

		return variableName;
	}

	function isVariable(
		declaration
	) {
		return (
			declaration.type === "variable"
			&&
			declaration.id === variableName
		);
	}

	function getNameFromDeclaration() {
		return (
			declarationAndParent.declaration.dependsUpon
			?
			getNameWhenDependsUpon()
			:
			!isParent() && getNameAndSetWhenUsedInNestedFunction()
		);

		function getNameWhenDependsUpon() {
			return (
				isParent()
				?
				declarationAndParent.declaration.dependsUpon
				:
				getNameAndSetWhenUsedInNestedFunction()
			);
		}

		function isParent() {
			return (
				parentFunctions
				?
				declarationAndParent.parent === parentFunctions.identifiable
				:
				!declarationAndParent.parent
			);
		}

		function getNameAndSetWhenUsedInNestedFunction() {
			declarationAndParent.declaration.isUsedInNestedFunction = true;

			return variableName;
		}
	}
}