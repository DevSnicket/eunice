// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ createElement } = require("react"),
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	getSvgElementForStack = require("../getSvgElementForStack"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	{ renderToStaticMarkup } = require("react-dom/server");

module.exports =
	(/** @type {import("./Parameter.d")} */{
		yaml,
		...restOfParameters
	}) =>
		renderToStaticMarkup(
			getSvgElementForStack({
				...restOfParameters,
				createElement,
				getTextWidth,
				stack:
					yaml
					&&
					createStackFromYaml(parseYaml(yaml)),
			}),
		);