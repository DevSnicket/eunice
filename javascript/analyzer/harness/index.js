// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{
		createFillWithTitleElement,
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createJavascriptEditor = require("./createJavascriptEditor"),
	createYamlOutputElementFromJavascript = require("./createYamlOutputElementFromJavascript"),
	initializeCodeEditorGlobal = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal");

initializeCodeEditorGlobal();

const javascriptEditor = createJavascriptEditor();

renderIntoContainerElement({
	initialState:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
	renderStateful:
		stateful =>
			createReflexContainerForColumnElements(
				[
					createFillWithTitleElement({
						content:
							javascriptEditor.createEditorElement(
								{ stateful },
							),
						title:
							"JavaScript",
					}),
					createYamlOutputElementFromJavascript(
						stateful.state.javascript,
					),
				],
			),
});