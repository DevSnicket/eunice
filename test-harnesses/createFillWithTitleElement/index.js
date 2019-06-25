/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const { createElement } = require("react");

require("./index.css");

module.exports =
	({
		content,
		title,
	}) =>
		createElement(
			"div",
			{ className: "fill-with-title" },
			createElement("div", null, title),
			content,
		);