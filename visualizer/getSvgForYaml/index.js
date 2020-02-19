// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import { createStackFromYaml } from "@devsnicket/eunice-dependency-and-structure";
import getSvgElementForStack from "../getSvgElementForStack";
import getTextWidth from "string-pixel-width";
import { safeLoad as parseYaml } from "js-yaml";
import { renderToStaticMarkup } from "react-dom/server";

export default (/** @type {import("./Parameter.d")} */{
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