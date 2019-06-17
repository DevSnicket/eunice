const path = require("path");

module.exports =
	({
		names,
		prefix,
		scope,
	}) =>
		names.map(
			name => (
				{
					directory:
						path.join(
							"node_modules",
							scope ? `@${scope}` : "",
							`${prefix}${name}`,
						),
					rootItemIdentifier:
						name,
				}
			),
		);