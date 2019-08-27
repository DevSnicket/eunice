// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const formatYaml = require("js-yaml").safeDump;

module.exports =
	itemOrItems =>
		itemOrItems
		?
		formatYaml(itemOrItems, { lineWidth: Number.MAX_SAFE_INTEGER })
		.trim()
		:
		"";