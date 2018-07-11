const formatYaml = require("js-yaml").safeDump;

module.exports =
	itemOrItems =>
		itemOrItems
		?
		formatYaml(itemOrItems)
		.trim()
		:
		"";