// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default ({
	createPathBasedDependsUpon,
	source,
	specifiers,
}) =>
	specifiers
	.flatMap(
		createSelectorWhenHasSource({
			createPathBasedDependsUpon,
			source,
		})
		||
		createDeclarationFromSpecifierWhenFunction,
	);

function createSelectorWhenHasSource({
	createPathBasedDependsUpon,
	source,
}) {
	return (
		source
		&&
		createDeclarationFromSpecifier
	);

	function createDeclarationFromSpecifier({
		exported,
		local,
	}) {
		return (
			{
				dependsUpon:
					createPathBasedDependsUpon({
						items: local.name,
						path: source.value,
					}),
				id:
					exported.name,
				type:
					"export",
			}
		);
	}
}

function createDeclarationFromSpecifierWhenFunction({
	exported,
	local,
}) {
	return (
		{
			dependsUpon:
				local.name,
			id:
				exported.name,
			isPeerFunctionRequired:
				true,
			type:
				"export",
		}
	);
}