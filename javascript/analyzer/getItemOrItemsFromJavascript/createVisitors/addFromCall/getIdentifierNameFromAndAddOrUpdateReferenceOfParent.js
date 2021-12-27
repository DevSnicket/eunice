// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	addUndeclaredReference,
	findDeclarationAndParent,
	parent,
	reference,
}) => {
	const declarationAndParent =
		findDeclarationAndParent(
			isReferencedDeclaration,
		);

	if (declarationAndParent)
		return getNameFromDeclaration();
	else {
		addUndeclaredReference({
			parent,
			reference,
		});

		return reference;
	}

	function isReferencedDeclaration({
		id: identifier,
		type,
	}) {
		return (
			(type === "import" || type === "variable")
			&&
			identifier === reference
		);
	}

	function getNameFromDeclaration() {
		return (
			declarationAndParent.declaration.dependsUpon
			?
			getNameWhenDependsUpon()
			:
			!isParent() && getNameAndSetWhenUsedInNestedFunction()
		);

		function getNameWhenDependsUpon() {
			return (
				isParent()
				?
				declarationAndParent.declaration.dependsUpon
				:
				getNameAndSetWhenUsedInNestedFunction()
			);
		}

		function isParent() {
			return (
				parent
				?
				declarationAndParent.parent === parent
				:
				!declarationAndParent.parent
			);
		}

		function getNameAndSetWhenUsedInNestedFunction() {
			declarationAndParent.declaration.isCalledFromNestedFunction = true;

			return reference;
		}
	}
};