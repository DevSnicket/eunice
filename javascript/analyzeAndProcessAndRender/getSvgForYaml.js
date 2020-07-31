// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import getSvgElementForStack from "@devsnicket/eunice-visualizer";
import getTextWidth from "string-pixel-width";
import parseStackFromYaml from "../parseStackFromYaml";
import { renderToStaticMarkup } from "react-dom/server";

export default
yaml =>
	renderToStaticMarkup(
		getSvgElementForStack({
			createElement,
			getTextWidth,
			// @ts-ignore
			stack:
				yaml
				&&
				parseStackFromYaml(yaml),
		}),
	);