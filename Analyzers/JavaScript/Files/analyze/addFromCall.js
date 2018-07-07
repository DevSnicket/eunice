module.exports =
	({
		addDependsUponFrom,
		addUndeclaredVariableNameReference,
		callExpression,
		findDeclarationFrom,
		findDeclarationIn,
		findParentFunction,
	}) => {
		const calleeName = callExpression.callee.name;

		if (calleeName)
			addFromParentFunction(
				findParentFunction()
			);

		function addFromParentFunction(
			parentFunction
		) {
			addCalleeToNestedCallMapWhenRelevant({
				addCallOf,
				calleeName,
				isVariableOfParentOrAddUndeclaredReference,
			});

			addArgumentsToNestedCallMap({
				addCallOf,
				callExpression,
				isVariableOfParentOrAddUndeclaredReference,
				parentFunction,
			});

			function isVariableOfParentOrAddUndeclaredReference(
				variableName
			) {
				return (
					isVariableOfOrAddUndeclaredReference({
						addUndeclaredVariableNameReference,
						findDeclarationFrom,
						findDeclarationIn,
						parent: parentFunction,
						variableName,
					})
				);
			}

			function addCallOf(
				name
			) {
				addDependsUponFrom({
					name,
					parent: parentFunction,
				});
			}
		}
	};

function addCalleeToNestedCallMapWhenRelevant({
	addCallOf,
	calleeName,
	isVariableOfParentOrAddUndeclaredReference,
}) {
	if (isRelevant())
		add();

	function isRelevant() {
		return (
			!isVariableOfParentOrAddUndeclaredReference(
				calleeName
			)
		);
	}

	function add() {
		addCallOf(
			calleeName
		);
	}
}

function addArgumentsToNestedCallMap({
	addCallOf,
	callExpression,
	isVariableOfParentOrAddUndeclaredReference,
	parentFunction,
}) {
	for (const argument of getArguments())
		if (isArgumentRelevant(argument))
			addCallOf(
				argument.name
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

	function isArgumentRelevant(
		argument
	) {
		return (
			isIdentifier()
			&&
			!isParameterOfParent(argument.name)
			&&
			!isVariableOfParentOrAddUndeclaredReference(
				argument.name
			)
		);

		function isIdentifier() {
			return argument.type === "Identifier";
		}
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

function isVariableOfOrAddUndeclaredReference({
	addUndeclaredVariableNameReference,
	findDeclarationFrom,
	findDeclarationIn,
	parent,
	variableName,
}) {
	if (isVariableOfParentFunction())
		return true;
	else {
		const variable = getVariable();

		if (variable)
			variable.isUsedInNestedFunction = true;
		else
			addUndeclaredVariableNameReference(
				variableName
			);

		return false;
	}

	function isVariableOfParentFunction() {
		return (
			findDeclarationIn({
				parent,
				predicate: isVariable,
			})
		);
	}

	function getVariable() {
		return (
			findDeclarationFrom({
				parent,
				predicate: isVariable,
			})
		);
	}

	function isVariable(
		declaration
	) {
		return (
			declaration.isVariable
			&&
			declaration.id === variableName
		);
	}
}