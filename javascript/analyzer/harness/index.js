/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{
		createFillWithTitleElement,
		createReflexContainerForColumnElements,
		renderIntoContainerElement,
	} = require("@devsnicket/eunice-test-harnesses"),
	createJavascriptEditor = require("./createJavascriptEditor"),
	createYamlOutputElementFromJavascript = require("./createYamlOutputElementFromJavascript"),
	initializeCodeEditorGlobal = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal");

initializeCodeEditorGlobal();

const javascriptEditor = createJavascriptEditor();

renderIntoContainerElement({
	initialState:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
	renderStateful:
		stateful =>
			createReflexContainerForColumnElements(
				[
					createFillWithTitleElement({
						content:
							javascriptEditor.createEditorElement(
								{ stateful },
							),
						title:
							"JavaScript",
					}),
					createYamlOutputElementFromJavascript(
						stateful.state.javascript,
					),
				],
			),
});