const
	parse = require("acorn").parse,
	walk = require("acorn/dist/walk");

const
	createVisitors = require("./createVisitors"),
	getYamlForItemOrItems = require("./getYamlForItemOrItems");

module.exports =
	javaScript =>
		getYamlForItemOrItems(
			getItemOrItemsForJavaScript(
				javaScript
			)
		);

function getItemOrItemsForJavaScript(
	javaScript
) {
	const visitors = createVisitors();

	walk.ancestor(
		parse(javaScript, { ecmaVersion: 9 }),
		visitors
	);

	return visitors.getItemOrItems();
}