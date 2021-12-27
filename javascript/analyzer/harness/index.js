// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	ReflexContainer,
	ReflexElement,
	ReflexSplitter,
} from "react-reflex";

import {
	createFillWithTitleElement,
	createHashFromLocation,
	createResizableContainer,
	renderIntoContainerElement,
} from "@devsnicket/eunice-test-harnesses";

import { createElement } from "react";
import createJavascriptEditor from "./createJavascriptEditor";
import createYamlOutputElementFromJavascript from "./createYamlOutputElementFromJavascript";
import initializeCodeEditorGlobal from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal";

initializeCodeEditorGlobal();

const javascriptEditor = createJavascriptEditor();

renderIntoContainerElement({
	initialState:
		// replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
	renderStateful:
		stateful =>
			createResizableContainer({
				createElement,
				flexKeysAndValues:
					createHashFromLocation(location),
				items:
					[
						{
							element:
								createFillWithTitleElement({
									content:
										javascriptEditor.createEditorElement(
											{ stateful },
										),
									title:
										"JavaScript",
								}),
						},
						{
							element:
								createYamlOutputElementFromJavascript(
									stateful.state.javascript,
								),
						},
					],
				orientation:
					"vertical",
				resizableElementTypes:
					{
						container: ReflexContainer,
						item: ReflexElement,
						splitter: ReflexSplitter,
					},
			}),
});