// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import formatSvg from "../formatSvg";
import getSvgElementForStack from "..";
import getTextWidth from "string-pixel-width";
import { renderToStaticMarkup } from "react-dom/server";

export default ({
	stack,
	...restOfParameters
}) =>
	formatSvg(
		renderToStaticMarkup(
			getSvgElementForStack({
				...restOfParameters,
				createElement,
				getTextWidth,
				stack,
			}),
		),
	);