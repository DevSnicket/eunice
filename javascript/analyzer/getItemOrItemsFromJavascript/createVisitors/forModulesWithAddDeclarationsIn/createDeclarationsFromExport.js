// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const removeJsFilePathExtension = require("../removeJsFilePathExtension");

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		source,
		specifiers,
	}) =>
		specifiers
		.flatMap(
			createSelectorWhenHasSource(source)
			||
			createDeclarationFromSpecifierWhenFunction,
		);

function createSelectorWhenHasSource(
	source,
) {
	return (
		source
		&&
		withSource(
			removeJsFilePathExtension(
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
					{
						id: source,
						items: local.name,
					},
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