// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{
		callOrCreateElementOnError,
		createFillWithTitleElement,
		createResizableContainer,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage"),
	{ createElement } = require("react"),
	{ createHashFromLocation } = require("@devsnicket/eunice-test-harnesses"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	initializeCodeEditorGlobal = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

const resizableElementTypes =
	{
		container: ReflexContainer,
		item: ReflexElement,
		splitter: ReflexSplitter,
	};

initializeCodeEditorGlobal();

const createYamlEditorElement =
	createCodeEditorForLanguage("yaml")
	.createEditorElement;

renderIntoContainerElement({
	initialState:
		// yamlFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ yaml: yamlFromWebpack },
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
								createYamlInputElement({
									createElement,
									createFillWithTitleElement,
									createYamlEditorElement,
									stateful,
								}),
						},
						{
							element:
								createYamlOutputElement({
									callOrCreateElementOnError,
									createElement,
									location,
									resizableElementTypes,
									state:
										stateful.state,
								}),
							flex:
								{ default: 0.75, key: "output-width" },
						},
					],
				orientation:
					"vertical",
				resizableElementTypes,
			}),
});