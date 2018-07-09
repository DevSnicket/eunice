module.exports =
	({
		addDependsUponIdentifierFrom,
		addUndeclaredVariableNameReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunction,
	}) => {
		const calleeName = callExpression.callee.name;

		if (calleeName && calleeName != "require")
			addFromParentFunction(
				findParentFunction()
			);

		function addFromParentFunction(
			parentFunction
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
				parentFunction,
			});

			function getIdentifierNameFromAndAddOrUpdateVariable(
				variableName
			) {
				return (
					getIdentifierNameFromAndAddOrUpdateVariableOfParent({
						addUndeclaredVariableNameReference,
						findDeclarationAndParent,
						parent: parentFunction,
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
						parent: parentFunction,
					});
			}
		}
	};

function addArgumentsToNestedCallMap({
	addDependsUponIdentifier,
	callExpression,
	getIdentifierNameFromAndAddOrUpdateVariable,
	parentFunction,
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
			!isParameterOfParent(
				argument.name
			)
			&&
			getIdentifierNameFromAndAddOrUpdateVariable(
				argument.name
			)
		);
	}

	function isParameterOfParent(
		name
	) {
		return (
			parentFunction
			&&
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

function getIdentifierNameFromAndAddOrUpdateVariableOfParent({
	addUndeclaredVariableNameReference,
	findDeclarationAndParent,
	parent,
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
		if (declarationAndParent.declaration.dependsUpon)
			return declarationAndParent.declaration.dependsUpon;
		else if (declarationAndParent.parent === parent)
			return null;
		else {
			declarationAndParent.declaration.isUsedInNestedFunction = true;

			return variableName;
		}
	}
}