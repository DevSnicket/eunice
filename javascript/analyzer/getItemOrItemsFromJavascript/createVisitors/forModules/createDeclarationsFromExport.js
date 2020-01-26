// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		createPathBasedDependsUpon,
		removeExtensionFromFilePath,
		source,
		specifiers,
	}) =>
		specifiers
		.flatMap(
			withCreatePathBasedDependsUpon(
				createPathBasedDependsUpon,
			)
			.createSelectorWhenHasSource({
				removeExtensionFromFilePath,
				source,
			})
			||
			createDeclarationFromSpecifierWhenFunction,
		);

function withCreatePathBasedDependsUpon(
	createPathBasedDependsUpon,
) {
	return { createSelectorWhenHasSource };

	function createSelectorWhenHasSource({
		removeExtensionFromFilePath,
		source,
	}) {
		return (
			source
			&&
			withSource(
				removeExtensionFromFilePath(
					source.value,
				),
			)
			.createDeclarationFromSpecifier
		);
	}

	function withSource(
		source,
	) {
		return { createDeclarationFromSpecifier };

		function createDeclarationFromSpecifier({
			exported,
			local,
		}) {
			return (
				{
					dependsUpon:
						createPathBasedDependsUpon({
							items: local.name,
							path: source,
						}),
					id:
						exported.name,
					type:
						"export",
				}
			);
		}
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