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
	createFillWithTitleElement,
	createHashFromLocation,
	createResizableContainer,
	renderIntoContainerElement,
} from "../../../test-harnesses";

import { createElement } from "react";
import createJavascriptEditor from "./createJavascriptEditor";
import createYamlOutputElementFromJavascript from "./createYamlOutputElementFromJavascript";
import initializeCodeEditorGlobal from "../../../test-harnesses/codeEditor/serviceWorkers/initializeGlobal";

initializeCodeEditorGlobal();

const javascriptEditor = createJavascriptEditor();

renderIntoContainerElement({
	initialState:
		// replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
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
								createFillWithTitleElement({
									content:
										javascriptEditor.createEditorElement(
											{ stateful },
										),
									title:
										"JavaScript",
								}),
						},
						{
							element:
								createYamlOutputElementFromJavascript(
									stateful.state.javascript,
								),
						},
					],
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