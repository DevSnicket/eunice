const
	{ createElement } = require("react"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	{
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

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
						resizableElementTypes:
							{
								container: ReflexContainer,
								element: ReflexElement,
								splitter: ReflexSplitter,
							},
						state:
							stateful.state,
					}),
				],
			),
});