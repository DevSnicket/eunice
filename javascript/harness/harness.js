/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ createElement } = require("react"),
	{
		callOrCreateElementOnError,
		createFillWithTitleElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage"),
	createJavascriptEditor = require("@devsnicket/eunice-javascript-analyzer/harness/createJavascriptEditor"),
	{
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createYamlInputElement = require("@devsnicket/eunice-renderer-test-harness/createYamlInputElement"),
	createYamlOutputElement = require("@devsnicket/eunice-renderer-test-harness/createYamlOutputElement"),
	{ getYamlFromJavaScript } = require("@devsnicket/eunice-javascript-analyzer"),
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
			createReflexContainerForColumnElements(
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
						createElement,
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
				],
			),
});

function createInitialStateFromJavascript(
	javascript,
) {
	return (
		{
			javascript,
			yaml: getYamlFromJavaScript(javascript),
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
					() => getYamlFromJavaScript(javascript),
				),
		}
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