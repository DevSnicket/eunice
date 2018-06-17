module.exports =
	({ file, walk }) => {
		const items = [];

		walk(
			file,
			getVisitors({ items, walk })
		);

		return items.length && { stack: items };
	};

function getVisitors({
	items,
	walk,
}) {
	const nestedFunctionMap = new Map();

	return (
		{
			ArrowFunctionExpression: visitFunctionArrowOrExpression,
			FunctionDeclaration: visitFunctionDeclaration,
			FunctionExpression: visitFunctionArrowOrExpression,
		}
	);

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
			if (isModuleExportAssigment)
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
			nestedFunctionMap.set(parent, item);
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
	}

	function createItemForFunction({
		identifier,
		node,
	}) {
		return (
			{
				id: identifier,
				...createDependsUpon({ dependent: node, walk }),
				...createItems(node),
			}
		);
	}

	function createItems(
		parent
	) {
		const nested = nestedFunctionMap.get(parent);

		return nested && { items: [ nested ] };
	}
}

function createDependsUpon({
	dependent,
	walk,
}) {
	const dependsUpon = [];

	walk(
		dependent,
		{
			CallExpression(node) {
				if (node.callee.name)
					dependsUpon.push(node.callee.name);
			},
		}
	);

	return (
		dependsUpon.length
		&&
		{ dependsUpon: distinct(dependsUpon.sort()) }
	);

	function distinct(
		items
	) {
		return (
			items
			.filter(
				(element, index, elements) =>
					!index
					||
					element != elements[index - 1]
			)
		);
	}
}