// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	ReflexContainer,
	ReflexElement,
	ReflexSplitter,
} from "react-reflex";

import {
	callOrCreateElementOnError,
	createFillWithTitleElement,
	createHashFromLocation,
	createResizableContainer,
	renderIntoContainerElement,
} from "@devsnicket/eunice-test-harnesses";

import babelParserPlugins from "../babelParserPluginsDefault";
import createCodeEditorForLanguage from "@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createJavascriptEditor from "@devsnicket/eunice-javascript-analyzer/harness/createJavascriptEditor";
import createYamlInputElement from "@devsnicket/eunice-interactive/createYamlInputElement";
import createYamlOutputElement from "@devsnicket/eunice-interactive/createYamlOutputElement";
import getYamlFromJavascript from "@devsnicket/eunice-javascript-analyzer/getYamlFromJavascript";
import initializeCodeEditorGlobal from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal";

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
						createFillWithTitleElement({
							content:
								createYamlInputElement({
									createYamlEditorElement,
									stateful,
								}),
							title:
								"YAML",
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