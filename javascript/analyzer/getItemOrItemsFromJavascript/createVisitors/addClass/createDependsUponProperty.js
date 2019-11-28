// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	function * createDependsUponProperty({
		classDeclarationOrExpression,
		createDependsUponPropertyForParent,
	}) {
		const property = createProperty();

		if (property)
			yield property;

		function createProperty() {
			return (
				createDependsUponPropertyForParent({
					identifiers:
						getBaseIdentifiers(),
					parent:
						classDeclarationOrExpression,
				})
			);
		}

		function * getBaseIdentifiers() {
			const base =
				classDeclarationOrExpression.superClass
				&&
				classDeclarationOrExpression.superClass.name;

			if (base)
				yield base;
		}
	};