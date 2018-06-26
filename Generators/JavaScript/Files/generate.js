module.exports =
	({ file, walk }) => {
		const items = [];

		walk(
			file,
			getVisitorsForItems(items)
		);

		return items.length && { stack: items };
	};

function getVisitorsForItems(
	items
) {
	const
		nestedCallMap = new Map(),
		nestedFunctionMap = new Map();

	return (
		{
			ArrowFunctionExpression: visitFunctionArrowOrExpression,
			CallExpression: visitCallExpression,
			FunctionDeclaration: visitFunctionDeclaration,
			FunctionExpression: visitFunctionArrowOrExpression,
		}
	);

	function visitCallExpression(
		callExpression,
		ancestors
	) {
		const callee = callExpression.callee.name;

		if (callee) {
			const parentFunction = findParentFunctionFromAncestors(ancestors);

			const calls = nestedCallMap.get(parentFunction);

			if (calls)
				calls.add(callee);
			else
				nestedCallMap.set(parentFunction, new Set([ callee ]));
		}
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
			const functions = nestedFunctionMap.get(parentFunction);

			if (functions)
				functions.push(item);
			else
				nestedFunctionMap.set(parentFunction, [ item ]);
		}
	}

	function createItemForFunction({
		identifier,
		node,
	}) {
		const calls = nestedCallMap.get(node);

		nestedCallMap.delete(node);

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
		const childItems = nestedFunctionMap.get(parent);

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
}

function findParentFunctionFromAncestors(
	ancestors
) {
	for (let index = ancestors.length - 2; index; index--)
		if (isFunctionType(ancestors[index].type))
			return ancestors[index];

	return null;

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
}