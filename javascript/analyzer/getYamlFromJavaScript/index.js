const
	callWhenProcessEntryPoint = require("@devsnicket/eunice-call-when-process-entry-point"),
	getItemOrItemsFromJavaScript = require("../getItemOrItemsFromJavaScript"),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWhenProcessEntryPoint({
	action: parameters => getYamlFromJavaScript(parameters.javaScript),
	standardInputParameter: "javaScript",
});

module.exports = getYamlFromJavaScript;

function getYamlFromJavaScript(
	javaScript,
) {
	return (
		getYamlForItemOrItems(
			getItemOrItemsFromJavaScript(
				javaScript,
			),
		)
	);
}