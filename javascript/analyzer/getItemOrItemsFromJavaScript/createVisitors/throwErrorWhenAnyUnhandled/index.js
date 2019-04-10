const formatMessageForTypeWhenAny = require("./formatMessageForTypeWhenAny");

module.exports =
	({
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
				declaration => declaration.id.name,
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