const
	{ createElement } = require("react"),
	createHorizontalResize = require("./createHorizontalResize"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex"),
	{ renderIntoContainerElement } = require("@devsnicket/eunice-test-harnesses");


const resizableElementTypes =
	{
		container: ReflexContainer,
		element: ReflexElement,
		splitter: ReflexSplitter,
	};

renderIntoContainerElement({
	initialState:
		// yamlFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ yaml: yamlFromWebpack },
	renderStateful:
		stateful =>
			createHorizontalResize({
				createElement,
				elements:
					{
						left:
							createYamlInputElement({
								createElement,
								stateful,
							}),
						right:
							createYamlOutputElement({
								createElement,
								location,
								resizableElementTypes,
								state:
									stateful.state,
							}),
					},
				resizableElementTypes,
			}),
});