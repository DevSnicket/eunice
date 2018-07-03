module.exports =
	({ file, walk }) => {
		const items = [];

		walk(
			file,
			getVisitorsForItems(items)
		);

		return items.length && items.map(item => [ item ]);
	};

function getVisitorsForItems(
	items
) {
	const
		callsByFunctions = new Map(),
		functionsInFunctions = new Map(),
		variablesInFunctions = new Map();

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
					!isVariable(argument.name)
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

			function isVariable(
				name
			) {
				for (const variables of variablesInFunctions.values())
					if (variables.includes(name))
						return true;

				return false;
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
		const childItems = functionsInFunctions.get(parent);

		return (
			childItems
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
	}

	function visitVariableDeclaration(
		variableDeclaration,
		ancestors
	) {
		const parentFunction = findParentFunctionFromAncestors(ancestors);

		variablesInFunctions.set(
			parentFunction,
			[
				...variablesInFunctions.get(parentFunction) || [],
				...getNonfunctionDeclarationIdentifiers(),
			]
		);

		function getNonfunctionDeclarationIdentifiers() {
			return (
				variableDeclaration.declarations
				.filter(declaration => !isFunctionType(declaration.init.type))
				.map(declaration => declaration.id.name)
			);
		}
	}
}

function findParentFunctionFromAncestors(
	ancestors
) {
	for (let index = ancestors.length - 2; index; index--)
		if (isFunctionType(ancestors[index].type))
			return ancestors[index];

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