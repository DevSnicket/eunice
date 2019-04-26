const
	{
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createJavascriptInputElement = require("./createJavascriptInputElement"),
	createYamlOutputElementFromJavascript = require("./createYamlOutputElementFromJavascript");

renderIntoContainerElement({
	initialState:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
	renderStateful:
		stateful =>
			createReflexContainerForColumnElements(
				[
					createJavascriptInputElement(
						{ stateful },
					),
					createYamlOutputElementFromJavascript(
						stateful.state.javascript,
					),
				],
			),
});