// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import { createStackFromYaml } from "@devsnicket/eunice-dependency-and-structure";
import getSvgElementForStack from "@devsnicket/eunice-visualizer";
import getTextWidth from "string-pixel-width";
import { safeLoad as parseYaml } from "js-yaml";
import { renderToStaticMarkup } from "react-dom/server";

export default
yaml =>
	renderToStaticMarkup(
		getSvgElementForStack({
			createElement,
			getTextWidth,
			stack:
				yaml
				&&
				createStackFromYaml(
					// @ts-ignore
					parseYaml(
						yaml,
					),
				),
		}),
	);