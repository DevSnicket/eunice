// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getItemOrItemsFromJavascript = require("../getItemOrItemsFromJavascript"),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

module.exports =
	/** @param {import("../getItemOrItemsFromJavascript/Parameter.d")} parameter */
	parameter =>
		getYamlForItemOrItems(
			getItemOrItemsFromJavascript(
				parameter,
			),
		);