module.exports =
	({
		addUndeclaredReference,
		findDeclarationAndParent,
		parentFunctions,
		reference,
	}) => {
		const declarationAndParent =
			findDeclarationAndParent(
				isVariable
			);

		if (declarationAndParent)
			return getNameFromDeclaration();
		else {
			addUndeclaredReference({
				parent: parentFunctions && parentFunctions.identifiable,
				reference,
			});

			return reference;
		}

		function isVariable(
			declaration
		) {
			return (
				declaration.type === "variable"
				&&
				declaration.id === reference
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
					parentFunctions
					?
					declarationAndParent.parent === parentFunctions.identifiable
					:
					!declarationAndParent.parent
				);
			}

			function getNameAndSetWhenUsedInNestedFunction() {
				declarationAndParent.declaration.isUsedInNestedFunction = true;

				return reference;
			}
		}
	};