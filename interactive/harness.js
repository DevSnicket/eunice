/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{
		callOrCreateElementOnError,
		createFillWithTitleElement,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage"),
	{ createElement } = require("react"),
	createHorizontalResize = require("./createHorizontalResize"),
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
		element: ReflexElement,
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
			createHorizontalResize({
				createElement,
				elements:
					{
						left:
							createYamlInputElement({
								createElement,
								createFillWithTitleElement,
								createYamlEditorElement,
								stateful,
							}),
						right:
							createYamlOutputElement({
								callOrCreateElementOnError,
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