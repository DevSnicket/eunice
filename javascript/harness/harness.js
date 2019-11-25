// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	babelParserPlugins = require("../babelParserPluginsDefault"),
	{ createElement } = require("react"),
	{
		callOrCreateElementOnError,
		createFillWithTitleElement,
		createHashFromLocation,
	} = require("@devsnicket/eunice-test-harnesses"),
	createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage"),
	createJavascriptEditor = require("@devsnicket/eunice-javascript-analyzer/harness/createJavascriptEditor"),
	{
		createResizableContainer,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createYamlInputElement = require("@devsnicket/eunice-renderer-test-harness/createYamlInputElement"),
	createYamlOutputElement = require("@devsnicket/eunice-renderer-test-harness/createYamlOutputElement"),
	getYamlFromJavascript = require("@devsnicket/eunice-javascript-analyzer/getYamlFromJavascript"),
	initializeCodeEditorGlobal = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

initializeCodeEditorGlobal();

const createYamlEditorElement =
	createCodeEditorForLanguage("yaml")
	.createEditorElement;

const createJavascriptEditorElement =
	createJavascriptEditor()
	.createEditorElement;

renderIntoContainerElement({
	initialState:
		// replaced with literal by webpack.config.js
		// eslint-disable-next-line no-undef
		createInitialStateFromJavascript(javascriptFromWebpack),
	renderStateful:
		stateful =>
			createResizableContainer({
				createElement,
				flexKeysAndValues:
					createHashFromLocation(location),
				items:
					[
						createFillWithTitleElement({
							content:
								createJavascriptEditorElement({
									createStateFromValue:
										createYamlStateFromJavascript,
									stateful,
								}),
							title:
								"JavaScript",
						}),
						createYamlInputElement({
							createFillWithTitleElement,
							createYamlEditorElement,
							stateful,
						}),
						createYamlOutputElement({
							callOrCreateElementOnError,
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
					]
					.map(element => ({ element })),
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

function createInitialStateFromJavascript(
	javascript,
) {
	return (
		{
			javascript,
			yaml:
				getYamlFromJavascriptWithOptionalEnabled(
					javascript,
				),
		}
	);
}

function createYamlStateFromJavascript(
	javascript,
) {
	return (
		{
			yaml:
				callOrGetMessageOnError(
					() =>
						getYamlFromJavascriptWithOptionalEnabled(
							javascript,
						),
				),
		}
	);
}

function getYamlFromJavascriptWithOptionalEnabled(
	javascript,
) {
	return (
		getYamlFromJavascript({
			babelParserPlugins,
			javascript,
		})
	);
}

function callOrGetMessageOnError(
	action,
) {
	try {
		return action();
	} catch (error) {
		return error.message;
	}
}