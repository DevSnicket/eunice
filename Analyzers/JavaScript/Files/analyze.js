module.exports =
	({ file, walk }) => {
		const functionItems = [];

		const
			callsByFunctions = new Map(),
			functionsByParentFunctions = new Map(),
			variableDeclarationsByParents = new Map();

		walk(
			file,
			getVisitors({
				callsByFunctions,
				functionItems,
				functionsByParentFunctions,
				variableDeclarationsByParents,
			})
		);

		const fileItem =
			createFileItemWhenRequired({
				callsByFunctions,
				functionItems,
				variableDeclarationsByParents,
			});

		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		if (callsByFunctions.size)
			throw new Error("Unhandled calls.");
		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		else if (functionsByParentFunctions.size)
			throw new Error("Unhandled functions.");
		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		else if (variableDeclarationsByParents.size)
			throw new Error("Unhandled variables.");
		else
			return (
				fileItem
				||
				(functionItems.length && functionItems.map(item => [ item ]))
			);
	};

function getVisitors({
	callsByFunctions,
	functionItems,
	functionsByParentFunctions,
	variableDeclarationsByParents,
}) {
	const ancestorsOfUndefinedVariables = new Map();

	return (
		{
			ArrowFunctionExpression: visitFunctionArrowOrExpression,
			CallExpression: visitCallExpression,
			FunctionDeclaration: visitFunctionDeclaration,
			FunctionExpression: visitFunctionArrowOrExpression,
			VariableDeclaration: visitVariableDeclaration,
		}
	);

	function visitCallExpression(
		callExpression,
		ancestors
	) {
		const callee = callExpression.callee.name;

		if (callee) {
			const parentFunction = findParentFunctionFromAncestors(ancestors);

			addToNestedCallMap({
				callee,
				parentFunction,
			});

			addArgumentsToNestedCallMap(
				parentFunction
			);
		}

		function addArgumentsToNestedCallMap(
			parentFunction
		) {
			for (const argument of getArguments())
				if (isArgumentRelevant(argument))
					addToNestedCallMap({
						callee: argument.name,
						parentFunction,
					});

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
					isIdentifier(argument)
					&&
					!isParameterOfParent(argument.name)
					&&
					!isVariableOfParentFunctionOrSetIsUsedInNestedFunction(argument.name)
				);
			}

			function isIdentifier(
				argument
			) {
				return argument.type === "Identifier";
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

			function isVariableOfParentFunctionOrSetIsUsedInNestedFunction(
				name
			) {
				if (isVariableOfParentFunction())
					return true;
				else {
					const variable = getVariable();

					if (variable)
						variable.isUsedInNestedFunction = true;
					else
						addToPotentialDeclarersOfVariables();

					return false;
				}

				function isVariableOfParentFunction() {
					const variablesOfParentFunction =
						variableDeclarationsByParents.get(parentFunction);

					return (
						variablesOfParentFunction
						&&
						variablesOfParentFunction.some(isVariable)
					);
				}

				function getVariable() {
					return (
						[ ...variableDeclarationsByParents.keys() ]
						.reverse()
						.filter(
							functionWithVariables =>
								functionWithVariables != parentFunction
						)
						.map(
							functionWithVariables =>
								variableDeclarationsByParents
								.get(functionWithVariables)
								.find(isVariable)
						)
						.filter(
							variable =>
								variable
						)[0]
					);
				}

				function isVariable(
					variable
				) {
					return variable.name === name;
				}

				function addToPotentialDeclarersOfVariables() {
					ancestorsOfUndefinedVariables.set(
						name,
						[
							...ancestorsOfUndefinedVariables.get(name) || [],
							...ancestors,
						]
					);
				}
			}
		}
	}

	function addToNestedCallMap({
		callee,
		parentFunction,
	}) {
		const calls = callsByFunctions.get(parentFunction);

		if (calls)
			calls.add(callee);
		else
			callsByFunctions.set(parentFunction, new Set([ callee ]));
	}

	function visitFunctionDeclaration(
		functionDeclaration,
		ancestors
	) {
		pushOrMapToParentWhenNested({
			ancestors,
			functionItem:
				createFunctionItem({
					identifier: functionDeclaration.id.name,
					node: functionDeclaration,
				}),
		});
	}

	function visitFunctionArrowOrExpression(
		functionExpression,
		ancestors
	) {
		const parent = ancestors[ancestors.length - 2];

		if (parent.type === "VariableDeclarator")
			pushOrMapToParentWhenNested({
				ancestors,
				functionItem: createItemWithIdentifier(parent.id.name),
			});
		else
			pushItemsWhenModuleExport();

		function pushItemsWhenModuleExport() {
			if (isModuleExportAssigment())
				functionItems.push(
					createItemWithIdentifier(
						getIdentifierWhenAssigment()
					)
				);

			function isModuleExportAssigment() {
				return (
					parent.type === "AssignmentExpression"
					&&
					isModuleExportMemberExpression(parent.left)
				);

				function isModuleExportMemberExpression(
					node
				) {
					return (
						node.type == "MemberExpression"
						&&
						node.object.name === "module"
						&&
						node.property.name === "exports"
					);
				}
			}

			function getIdentifierWhenAssigment() {
				return (
					functionExpression.id
					?
					functionExpression.id.name
					:
					`${parent.left.object.name}.${parent.left.property.name}`
				);
			}
		}

		function createItemWithIdentifier(
			identifier
		) {
			return (
				createFunctionItem({
					identifier,
					node: functionExpression,
				})
			);
		}
	}

	function pushOrMapToParentWhenNested({
		ancestors,
		functionItem,
	}) {
		const parentFunction = findParentFunctionFromAncestors(ancestors);

		if (parentFunction)
			addToNestedFunctionMap();
		else
			functionItems.push(functionItem);

		function addToNestedFunctionMap() {
			const functions = functionsByParentFunctions.get(parentFunction);

			if (functions)
				functions.push(functionItem);
			else
				functionsByParentFunctions.set(parentFunction, [ functionItem ]);
		}
	}

	function createFunctionItem({
		identifier,
		node,
	}) {
		const functionItemsOfNode = functionsByParentFunctions.get(node);

		functionsByParentFunctions.delete(node);

		return (
			{
				id: identifier,
				...createDependsUponProperty({
					callsByFunctions,
					node,
				}),
				...concatItemsIntoProperty({
					functionItems:
						functionItemsOfNode,
					variableItems:
						createVariableItemsUsedInNested({
							node,
							variableDeclarationsByParents,
						}),
				}),
			}
		);
	}

	function visitVariableDeclaration(
		variableDeclaration,
		ancestors
	) {
		const
			parentFunction = findParentFunctionFromAncestors(ancestors),
			variables = createVariables();

		if (variables.length)
			variableDeclarationsByParents.set(
				parentFunction,
				[
					...variableDeclarationsByParents.get(parentFunction) || [],
					...variables,
				]
			);

		function createVariables() {
			return (
				variableDeclaration.declarations
				.filter(declaration => !isFunctionType(declaration.init.type))
				.map(declaration => createVariableWithName(declaration.id.name))
			);
		}

		function createVariableWithName(
			name
		) {
			return (
				{
					isUsedInNestedFunction: isUsedInNestedFunction(),
					name,
				}
			);

			function isUsedInNestedFunction() {
				const potentialDeclarers = ancestorsOfUndefinedVariables.get(name);

				return (
					potentialDeclarers
					&&
					(!parentFunction || potentialDeclarers.includes(parentFunction))
				);
			}
		}
	}
}

function findParentFunctionFromAncestors(
	ancestors
) {
	for (let index = ancestors.length - 2; index; index--) {
		const ancestor = ancestors[index];

		if (isFunctionType(ancestor.type) && !ancestor.expression)
			return ancestor;
	}

	return null;
}

function isFunctionType(
	type
) {
	return (
		type === "ArrowFunctionExpression"
		||
		type === "FunctionDeclaration"
		||
		type === "FunctionExpression"
	);
}

function createFileItemWhenRequired({
	callsByFunctions,
	functionItems,
	variableDeclarationsByParents,
}) {
	const
		dependsUponProperty =
			createDependsUponProperty({
				callsByFunctions,
				node: null,
			}),
		variableItems =
			createVariableItemsUsedInNested({
				node: null,
				variableDeclarationsByParents,
			});

	return (
		createWhenAnyDependsUpon()
		||
		createWhenAnyVariables()
	);

	function createWhenAnyDependsUpon() {
		return (
			dependsUponProperty
			&&
			[
				[
					{
						...dependsUponProperty,
						...concatItemsIntoProperty({ functionItems, variableItems }),
					},
				],
			]
		);
	}

	function createWhenAnyVariables() {
		return (
			variableItems
			&&
			variableItems.length
			&&
			concatItems({ functionItems, variableItems })
		);
	}
}

function createDependsUponProperty({
	callsByFunctions,
	node,
}) {
	const calls = callsByFunctions.get(node);

	callsByFunctions.delete(node);

	return calls && { dependsUpon: [ ...calls ].sort() };
}

function createVariableItemsUsedInNested({
	node,
	variableDeclarationsByParents,
}) {
	const variables = variableDeclarationsByParents.get(node);

	variableDeclarationsByParents.delete(node);

	return (
		variables
		&&
		variables
		.filter(variable => variable.isUsedInNestedFunction)
		.map(variable => ({ id: variable.name }))
	);
}

function concatItemsIntoProperty({
	functionItems,
	variableItems,
}) {
	const items = concatItems({ functionItems, variableItems });

	return items && { items };
}

function concatItems({
	functionItems,
	variableItems,
}) {
	const items =
		[
			...variableItems || [],
			...functionItems || [],
		];

	return (
		items.length
		&&
		getInStackWhenMultiple()
	);

	function getInStackWhenMultiple() {
		return (
			items.length > 1
			?
			items.map(item => [ item ])
			:
			items
		);
	}
}