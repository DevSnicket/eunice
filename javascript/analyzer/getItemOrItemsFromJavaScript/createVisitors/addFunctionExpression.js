module.exports =
	({
		addDeclarationIn,
		ancestors,
		createFunctionDeclarationWithIdentifier,
		findParentFunctionFromAncestors,
		functionExpression,
	}) => {
		const parent = ancestors[ancestors.length - 2];

		switch (parent.type) {
			case "AssignmentExpression":
				addAssignment();
				break;
			case "VariableDeclarator":
				addVariable(parent.id.name);
				break;
			default:
		}

		function addAssignment() {
			if (isModuleExportMemberExpression(parent.left))
				addModuleExport();
			else
				addVariable(parent.left.name);

			function addModuleExport() {
				addDeclarationIn({
					declaration:
						createDeclarationWithIdentifier(
							functionExpression.id
							&&
							functionExpression.id.name,
						),
					parent:
						null,
				});
			}
		}

		function addVariable(
			identifier,
		) {
			addDeclarationIn({
				declaration:
					createDeclarationWithIdentifier(
						identifier,
					),
				parent:
					findParentFunctionFromAncestors(
						ancestors,
					),
			});
		}

		function createDeclarationWithIdentifier(
			identifier,
		) {
			return (
				createFunctionDeclarationWithIdentifier({
					functionDeclaration: functionExpression,
					identifier,
				})
			);
		}
	};

function isModuleExportMemberExpression(
	node,
) {
	return (
		node.type === "MemberExpression"
		&&
		node.object.name === "module"
		&&
		node.property.name === "exports"
	);
}