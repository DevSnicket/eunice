// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import createElementsFromStack from "../";
import { createHashFromLocation } from "@devsnicket/eunice-test-harnesses";
import parseStackFromYaml from "../../../parseStackFromYaml";
import readTextFile from "../../../readTextFile";
import { renderToStaticMarkup } from "react-dom/server";

export default
async({
	expectedFilePath,
	expectedHtmlPrefix,
	locationHash,
	yaml,
}) =>
	expect(
		renderToStaticMarkup(
			createElementsFromStack({
				createElement,
				locationHash:
					createHashFromLocation({ hash: locationHash }),
				resizableElementTypes:
					null,
				stack:
					parseStackFromYaml(yaml),
			}),
		),
	)
	.toEqual(
		wrapInPaddingDiv(
			expectedHtmlPrefix
			+
			await readTextFile(
				expectedFilePath,
			),
		),
	);

function wrapInPaddingDiv(
	content,
) {
	return `<div style="padding:0.5em">${content}</div>`;
}