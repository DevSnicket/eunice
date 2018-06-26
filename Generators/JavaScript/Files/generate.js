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
		dependsUpon = new Set(),
		nestedFunctionMap = new Map();

	let hasDependsUpon = false;

	return (
		{
			ArrowFunctionExpression: visitFunctionArrowOrExpression,
			CallExpression: visitCallExpression,
			FunctionDeclaration: visitFunctionDeclaration,
			FunctionExpression: visitFunctionArrowOrExpression,
		}
	);

	function visitCallExpression(
		callExpression
	) {
		if (callExpression.callee.name) {
			dependsUpon.add(callExpression.callee.name);
			hasDependsUpon = true;
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
		const parent = findParentWhenNested();

		if (parent)
			addToNestedFunctionMap();
		else
			items.push(item);

		function findParentWhenNested() {
			for (let index = ancestors.length - 2; index; index--)
				if (isFunctionType(ancestors[index].type))
					return ancestors[index];

			return false;

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

		function addToNestedFunctionMap() {
			const parentMap = nestedFunctionMap.get(parent);

			if (parentMap)
				parentMap.push(item);
			else
				nestedFunctionMap.set(parent, [ item ]);
		}
	}

	function createItemForFunction({
		identifier,
		node,
	}) {
		const item =
			{
				id: identifier,
				...hasDependsUpon && { dependsUpon: [ ...dependsUpon ].sort() },
				...createItems(node),
			};

		dependsUpon.clear();
		hasDependsUpon = false;

		return item;
	}

	function createItems(
		parent
	) {
		const nested = nestedFunctionMap.get(parent);

		return nested && { items: nested };
	}
}