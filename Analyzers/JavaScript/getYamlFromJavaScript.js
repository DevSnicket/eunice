const
	callWhenProcessEntryPoint = require("../../callWhenProcessEntryPoint"),
	getItemOrItemsFromJavaScript = require("./getItemOrItemsFromJavaScript"),
	getYamlForItemOrItems = require("./getYamlForItemOrItems");

callWhenProcessEntryPoint({
	action: parameters => getYamlFromJavaScript(parameters.javaScript),
	standardInputParameter: "javaScript",
});

module.exports = getYamlFromJavaScript;

function getYamlFromJavaScript(
	javaScript
) {
	return (
		getYamlForItemOrItems(
			getItemOrItemsFromJavaScript(
				javaScript
			)
		)
	);
}