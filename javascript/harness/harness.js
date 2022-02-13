/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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
} from "../../test-harnesses";

import {
	createYamlInputElement,
	createYamlOutputElement,
} from "../../interactive";

import babelParserPlugins from "../babelParserPluginsDefault";
import createCodeEditorForLanguage from "../../test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createJavascriptEditor from "../analyzer/harness/createJavascriptEditor";
import getYamlFromJavascript from "../analyzer/getYamlFromJavascript";
import initializeCodeEditorGlobal from "../../test-harnesses/codeEditor/serviceWorkers/initializeGlobal";
import parseStackFromYaml from "../parseStackFromYaml";

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
							areDependenciesOfAncestorsIncluded:
								false,
							callOrCreateElementOnError,
							createElement,
							location,
							resizableElementTypes:
								{
									container: ReflexContainer,
									element: ReflexElement,
									splitter: ReflexSplitter,
								},
							stack:
								parseStackFromYaml(
									stateful.state.yaml,
								),
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

function callOrGetMessageOnError(
	action,
) {
	try {
		return action();
	} catch (error) {
		return error.message;
	}
}