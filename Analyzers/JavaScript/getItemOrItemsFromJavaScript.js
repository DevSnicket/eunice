const
	{ parse } = require("acorn"),
	walk = require("acorn/dist/walk");

const
	createVisitors = require("./createVisitors");

module.exports =
	javaScript => {
		const visitors = createVisitors();

		walk.ancestor(
			parse(javaScript, { ecmaVersion: 9 }),
			visitors
		);

		return visitors.getItemOrItems();
	};