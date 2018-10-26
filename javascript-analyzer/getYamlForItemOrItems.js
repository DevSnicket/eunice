const formatYaml = require("js-yaml").safeDump;

module.exports =
	itemOrItems =>
		itemOrItems
		?
		formatYaml(itemOrItems, { lineWidth: Number.MAX_SAFE_INTEGER })
		.trim()
		:
		"";