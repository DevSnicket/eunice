const
	getItemOrItemsFromJavaScript = require("./getItemOrItemsFromJavaScript"),
	getYamlForItemOrItems = require("./getYamlForItemOrItems");

module.exports =
	javaScript =>
		getYamlForItemOrItems(
			getItemOrItemsFromJavaScript(
				javaScript
			)
		);