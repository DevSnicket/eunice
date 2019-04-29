const
	{ createElement } = require("react"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	{
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses");

renderIntoContainerElement({
	initialState:
		// yamlFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ yaml: yamlFromWebpack },
	renderStateful:
		stateful =>
			createReflexContainerForColumnElements(
				[
					createYamlInputElement({
						createElement,
						stateful,
					}),
					createYamlOutputElement({
						createElement,
						location,
						state: stateful.state,
					}),
				],
			),
});