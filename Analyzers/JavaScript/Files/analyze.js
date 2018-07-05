module.exports =
	({ file, walk }) => {
		const
			callsByFunctions = new Map(),
			declarationsByParents = new Map();

		walk(
			file,
			getVisitors({
				callsByFunctions,
				declarationsByParents,
			})
		);

		const items =
			createRootItems({
				callsByFunctions,
				declarationsByParents,
			});

		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		if (callsByFunctions.size)
			throw new Error("Unhandled calls.");
		/* istanbul ignore next: error is only thrown when there is gap in the implementation */
		else if (declarationsByParents.size)
			throw new Error("Unhandled declarations.");
		else
			return items;
	};

function getVisitors({
	callsByFunctions,
	declarationsByParents,
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
		const calleeName = callExpression.callee.name;

		if (calleeName)
			addFromParentFunction(
				findParentFunctionFromAncestors(
					ancestors
				)
			);

		function addFromParentFunction(
			parentFunction
		) {
			addCalleeToNestedCallMapWhenRelevant();

			addArgumentsToNestedCallMap();

			function addCalleeToNestedCallMapWhenRelevant() {
				if (isRelevant())
					add();

				function isRelevant() {
					return (
						!isVariableNameOfParentFunctionOrSetIsUsedInNestedFunction(
							calleeName
						)
					);
				}

				function add() {
					addToNestedCallMap({
						calleeName,
						parentFunction,
					});
				}
			}

			function addArgumentsToNestedCallMap() {
				for (const argument of getArguments())
					if (isArgumentRelevant(argument))
						addToNestedCallMap({
							calleeName: argument.name,
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
						isIdentifier()
						&&
						!isParameterOfParent(argument.name)
						&&
						!isVariableNameOfParentFunctionOrSetIsUsedInNestedFunction(
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

			function isVariableNameOfParentFunctionOrSetIsUsedInNestedFunction(
				variableName
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
					const declarationsOfParentFunction =
						declarationsByParents.get(parentFunction);

					return (
						declarationsOfParentFunction
						&&
						declarationsOfParentFunction.some(isVariable)
					);
				}

				function getVariable() {
					return (
						[ ...declarationsByParents.keys() ]
						.reverse()
						.filter(
							declarationsParent =>
								declarationsParent != parentFunction
						)
						.map(
							findVariableWhenDeclaredBy
						)
						.filter(
							variable =>
								variable
						)[0]
					);
				}

				function findVariableWhenDeclaredBy(
					parent
				) {
					const declarationsOfParent =
						declarationsByParents.get(parent);

					return (
						declarationsOfParent
						&&
						declarationsOfParent.find(isVariable)
					);
				}

				function isVariable(
					item
				) {
					return (
						item.isVariable
						&&
						item.id === variableName
					);
				}

				function addToPotentialDeclarersOfVariables() {
					ancestorsOfUndefinedVariables.set(
						variableName,
						[
							...ancestorsOfUndefinedVariables.get(variableName) || [],
							...ancestors,
						]
					);
				}
			}
		}
	}

	function addToNestedCallMap({
		calleeName,
		parentFunction,
	}) {
		const calls = callsByFunctions.get(parentFunction);

		if (calls)
			calls.add(calleeName);
		else
			callsByFunctions.set(parentFunction, new Set([ calleeName ]));
	}

	function visitFunctionDeclaration(
		functionDeclaration,
		ancestors
	) {
		addDeclarationToParentFunctionInAncestors({
			ancestors,
			declaration:
				createFunctionDeclaration({
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
			addDeclarationToParentFunctionInAncestors({
				ancestors,
				declaration:
					createDeclarationWithIdentifier(
						parent.id.name
					),
			});
		else
			pushItemsWhenModuleExport();

		function pushItemsWhenModuleExport() {
			if (isModuleExportAssigment())
				addDeclarationsToParent(
					[
						createDeclarationWithIdentifier(
							getIdentifierWhenAssigment()
						),
					],
					null
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

		function createDeclarationWithIdentifier(
			identifier
		) {
			return (
				createFunctionDeclaration({
					identifier,
					node: functionExpression,
				})
			);
		}
	}

	function addDeclarationToParentFunctionInAncestors({
		ancestors,
		declaration,
	}) {
		addDeclarationsToParent(
			[ declaration ],
			findParentFunctionFromAncestors(ancestors)
		);
	}

	function createFunctionDeclaration({
		identifier,
		node,
	}) {
		const items =
			createItemsForParentFromDeclarations({
				declarationsByParents,
				parent: node,
			});

		return (
			{
				id: identifier,
				isFunction: true,
				...createDependsUponProperty({
					callsByFunctions,
					node,
				}),
				...items && { items },
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
			addDeclarationsByParent();

		function createVariables() {
			return (
				variableDeclaration.declarations
				.filter(declaration => !isFunctionType(declaration.init.type))
				.map(declaration => createVariableDeclaration(declaration.id.name))
			);
		}

		function createVariableDeclaration(
			id
		) {
			return (
				{
					id,
					isUsedInNestedFunction: isUsedInNestedFunction(),
					isVariable: true,
				}
			);

			function isUsedInNestedFunction() {
				const potentialDeclarers = ancestorsOfUndefinedVariables.get(id);

				return (
					potentialDeclarers
					&&
					(!parentFunction || potentialDeclarers.includes(parentFunction))
				);
			}
		}

		function addDeclarationsByParent() {
			addDeclarationsToParent(
				variables,
				parentFunction
			);
		}
	}

	function addDeclarationsToParent(
		declarations,
		parent
	) {
		declarationsByParents.set(
			parent,
			[
				...declarationsByParents.get(parent) || [],
				...declarations,
			]
		);
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

function createRootItems({
	callsByFunctions,
	declarationsByParents,
}) {
	const
		dependsUponProperty =
			createDependsUponProperty({
				callsByFunctions,
				node: null,
			}),
		items =
			createItemsForParentFromDeclarations({
				declarationsByParents,
				parent: null,
			});

	return (
		createItemWhenAnyDependsUpon()
		||
		(items && getItemInStackWhenSingle())
	);

	function createItemWhenAnyDependsUpon() {
		return (
			dependsUponProperty
			&&
			[
				[
					{
						...dependsUponProperty,
						...items && { items },
					},
				],
			]
		);
	}

	function getItemInStackWhenSingle() {
		return (
			items.length === 1
			?
			[ items ]
			:
			items
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

function createItemsForParentFromDeclarations({
	declarationsByParents,
	parent,
}) {
	const declarations = declarationsByParents.get(parent);

	declarationsByParents.delete(parent);

	return createItems();

	function createItems() {
		return (
			declarations
			&&
			getItemsWhenAnyAndInStackWhenMultiple(
				declarations
				.map(createItemFromDeclarationWhenRequired)
				.filter(item => item)
			)
		);

		function createItemFromDeclarationWhenRequired(
			declaration
		) {
			return createWhenFunction() || createWhenVariable();

			function createWhenFunction() {
				return (
					declaration.isFunction
					&&
					{
						id: declaration.id,
						...declaration.dependsUpon && { dependsUpon: declaration.dependsUpon },
						...declaration.items && { items: declaration.items },
					}
				);
			}

			function createWhenVariable() {
				return (
					declaration.isVariable
					&&
					declaration.isUsedInNestedFunction
					&&
					{ id: declaration.id }
				);
			}
		}

		function getItemsWhenAnyAndInStackWhenMultiple(
			items
		) {
			return (
				items.length
				&&
				getItemsInStackWhenMultiple()
			);

			function getItemsInStackWhenMultiple() {
				return (
					items.length > 1
					?
					items.map(item => [ item ])
					:
					items
				);
			}
		}
	}
}