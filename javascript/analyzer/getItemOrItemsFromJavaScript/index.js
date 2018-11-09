const
	{ parse } = require("acorn"),
	walk = require("acorn/dist/walk");

const
	createVisitors = require("./createVisitors");

module.exports =
	javaScript => {
		const visitors = createVisitors();

		walk.ancestor(
			parse(
				removeUnixShebangForNode(javaScript),
				{ ecmaVersion: 9 },
			),
			visitors,
		);

		return visitors.getItemOrItems();
	};

function removeUnixShebangForNode(
	javascript,
) {
	const shebang = "#!/usr/bin/env node";

	return (
		javascript.startsWith(shebang)
		?
		javascript.substring(shebang.length)
		:
		javascript
	);
}