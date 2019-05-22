const path = require("path");

module.exports =
	({
		names,
		prefix,
	}) =>
		names.map(name => createSourceWithName(`${prefix}${name}`));

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