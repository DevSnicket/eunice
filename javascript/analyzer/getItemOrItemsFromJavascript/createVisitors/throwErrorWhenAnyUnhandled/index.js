// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import formatMessageForTypeWhenAny from "./formatMessageForTypeWhenAny";

export default ({
	declarations,
	dependsUponIdentifiers,
}) => {
	const message =
		[
			formatMessageForDeclarations(
				declarations,
			),
			formatMessageForDependsUponIdentifiers(
				dependsUponIdentifiers,
			),
		]
		.filter(Boolean)
		.join("\n\n");

	if (message)
		throw new Error(message);
};

function formatMessageForDeclarations(
	declarations,
) {
	return (
		formatMessageForTypeWhenAny({
			itemIdentifierSelector:
				declaration => declaration.id,
			itemsSelector:
				hasItems => hasItems.declarations,
			parentsWithItems:
				declarations,
			type:
				"declarations",
		})
	);
}

function formatMessageForDependsUponIdentifiers(
	dependsUponIdentifiers,
) {
	return (
		formatMessageForTypeWhenAny({
			itemIdentifierSelector:
				identifier => identifier,
			itemsSelector:
				hasItems => hasItems.identifiers,
			parentsWithItems:
				dependsUponIdentifiers,
			type:
				"dependencies",
		})
	);
}