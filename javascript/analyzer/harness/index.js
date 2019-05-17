const
	{ createElement } = require("react"),
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
							javascriptEditor.createEditorElement({
								createElement,
								stateful,
							}),
						title:
							"JavaScript",
					}),
					createYamlOutputElementFromJavascript(
						stateful.state.javascript,
					),
				],
			),
});