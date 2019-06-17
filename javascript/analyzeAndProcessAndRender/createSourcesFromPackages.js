const path = require("path");

module.exports =
	({
		names,
		prefix,
		scope,
	}) => {
		const scopeAndPrefix =
			scope
			?
			`@${scope}/${prefix}`
			:
			prefix;

		return names.map(name => createSourceWithName(`${scopeAndPrefix}${name}`));
	};

function createSourceWithName(
	name,
) {
	return (
		{
			directory:
				path.join("node_modules", name),
			identifierPrefixOfRootItems:
				name,
		}
	);
}