module.exports =
	({ file, walk }) => {
		const items = [];

		const
			callsByFunctions = new Map(),
			functionsInFunctions = new Map(),
			variablesInFunctions = new Map();

		walk(
			file,
			getVisitors({
				callsByFunctions,
				functionsInFunctions,
				items,
				variablesInFunctions,
			})
		);

		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		if (callsByFunctions.size)
			throw new Error("Unhandled calls.");
		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		else if (functionsInFunctions.size)
			throw new Error("Unhandled functions.");
		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		else if (variablesInFunctions.size)
			throw new Error("Unhandled variables.");
		else
			return items.length && items.map(item => [ item ]);
	};

function getVisitors({
	callsByFunctions,
	functionsInFunctions,
	items,
	variablesInFunctions,
}) {
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
					!isVariableOfParentFunctionOrSetIsUsedInNested(argument.name)
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

			function isVariableOfParentFunctionOrSetIsUsedInNested(
				name
			) {
				if (isVariableOfParentFunction())
					return true;
				else {
					const variable = getVariable();

					if (variable)
						variable.isUsedInNested = true;

					return false;
				}

				function isVariableOfParentFunction() {
					const variablesOfParentFunction =
						variablesInFunctions.get(parentFunction);

					return (
						variablesOfParentFunction
						&&
						variablesOfParentFunction.some(isVariable)
					);
				}

				function getVariable() {
					return (
						[ ...variablesInFunctions.keys() ]
						.reverse()
						.filter(
							functionWithVariables =>
								functionWithVariables != parentFunction
						)
						.map(
							functionWithVariables =>
								variablesInFunctions
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
			item:
				createItemForFunction({
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
				item: createItemWithIdentifier(parent.id.name),
			});
		else
			pushItemsWhenModuleExport();

		function pushItemsWhenModuleExport() {
			if (isModuleExportAssigment())
				items.push(
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
				createItemForFunction({
					identifier,
					node: functionExpression,
				})
			);
		}
	}

	function pushOrMapToParentWhenNested({
		ancestors,
		item,
	}) {
		const parentFunction = findParentFunctionFromAncestors(ancestors);

		if (parentFunction)
			addToNestedFunctionMap();
		else
			items.push(item);

		function addToNestedFunctionMap() {
			const functions = functionsInFunctions.get(parentFunction);

			if (functions)
				functions.push(item);
			else
				functionsInFunctions.set(parentFunction, [ item ]);
		}
	}

	function createItemForFunction({
		identifier,
		node,
	}) {
		const calls = callsByFunctions.get(node);

		callsByFunctions.delete(node);

		return (
			{
				id: identifier,
				...calls && { dependsUpon: [ ...calls ].sort() },
				...createItems(node),
			}
		);
	}

	function createItems(
		parent
	) {
		const childItems =
			[
				...getVariablesUsedInNested(variablesInFunctions.get(parent)) || [],
				...functionsInFunctions.get(parent) || [],
			];

		functionsInFunctions.delete(parent);
		variablesInFunctions.delete(parent);

		return (
			childItems.length
			&&
			{
				items:
					childItems.length > 1
					?
					childItems.map(item => [ item ])
					:
					childItems,
			}
		);

		function getVariablesUsedInNested(
			variables
		) {
			return (
				variables
				&&
				variables
				.filter(variable => variable.isUsedInNested)
				.map(variable => ({ id: variable.name }))
			);
		}
	}

	function visitVariableDeclaration(
		variableDeclaration,
		ancestors
	) {
		const
			nonfunctionDeclarationIdentifiers = getNonfunctionDeclarationIdentifiers(),
			parentFunction = findParentFunctionFromAncestors(ancestors);

		if (nonfunctionDeclarationIdentifiers.length)
			variablesInFunctions.set(
				parentFunction,
				[
					...variablesInFunctions.get(parentFunction) || [],
					...nonfunctionDeclarationIdentifiers,
				]
			);

		function getNonfunctionDeclarationIdentifiers() {
			return (
				variableDeclaration.declarations
				.filter(declaration => !isFunctionType(declaration.init.type))
				.map(declaration => ({ name: declaration.id.name }))
			);
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