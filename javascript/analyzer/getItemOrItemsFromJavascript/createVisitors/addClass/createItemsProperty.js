// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	function * createItemsProperty({
		classDeclarationOrExpression,
		constructor,
		createItemsForAndRemoveDeclarationsIn,
	}) {
		const items =
			stackItemsWhenMultiple({
				items:
					[
						...getItemsFromClass() || [],
						...getItemsFromConstructor() || [],
					],
				withSingleInArray:
					false,
			});

		if (items)
			yield { items };

		function getItemsFromClass() {
			return (
				createItemsForAndRemoveDeclarationsIn(
					classDeclarationOrExpression,
				)
			);
		}

		function getItemsFromConstructor() {
			return (
				constructor
				&&
				createItemsForAndRemoveDeclarationsIn(
					constructor.value,
				)
			);
		}
	};