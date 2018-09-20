module.exports =
	({
		addDeclarationIn,
		ancestors,
		createFunctionDeclarationWithIdentifier,
		findParentFunctionFromAncestors,
		functionExpression,
	}) => {
		const parent = ancestors[ancestors.length - 2];

		if (parent.type === "VariableDeclarator")
			addWhenVariable();
		else
			addWhenModuleExport();

		function addWhenVariable() {
			addDeclarationIn({
				declaration:
					createDeclarationWithIdentifier(
						parent.id.name,
					),
				parent:
					findParentFunctionFromAncestors(
						ancestors,
					),
			});
		}

		function addWhenModuleExport() {
			if (isModuleExportAssigment())
				addDeclarationIn({
					declaration:
						createDeclarationWithIdentifier(
							getIdentifier(),
						),
					parent:
						null,
				});

			function isModuleExportAssigment() {
				return (
					parent.type === "AssignmentExpression"
					&&
					isModuleExportMemberExpression(parent.left)
				);
			}

			function getIdentifier() {
				return (
					functionExpression.id
					&&
					functionExpression.id.name
				);
			}
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
		node.type == "MemberExpression"
		&&
		node.object.name === "module"
		&&
		node.property.name === "exports"
	);
}