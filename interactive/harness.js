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
	addDirectionAndMutualStackToDependenciesInStack,
	createYamlFromStack,
} from "../dependency-and-structure";

import {
	callOrCreateElementOnError,
	createHashFromLocation,
	createResizableContainer,
	renderIntoContainerElement,
} from "../test-harnesses";

import createCodeEditorForLanguage from "../test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createYamlInputElement from "./createYamlInputElement";
import createYamlOutputElement from "./createYamlOutputElement";
import { safeDump as formatYaml } from "js-yaml";
import inferStacksInStack from "../stacking-inference";
import initializeCodeEditorGlobal from "../test-harnesses/codeEditor/serviceWorkers/initializeGlobal";
import parseStackFromYaml from "./parseStackFromYaml";

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
		createInitialStateFromYaml(
			// replaced with literal
			// eslint-disable-next-line no-undef
			yamlLiteralPlaceholder,
		),
	renderStateful,
});

function createInitialStateFromYaml(
	yaml,
) {
	const stack = parseStackFromYaml(yaml);

	// replaced with literal
	// eslint-disable-next-line no-undef
	if (isInferStacksEnabledLiteralPlaceholder && stack) {
		inferStacksInStack(stack);

		const yamlWithInferLevels =
			formatYaml(
				createYamlFromStack(stack),
				{ lineWidth: Number.MAX_SAFE_INTEGER },
			);

		addDirectionAndMutualStackToDependenciesInStack(stack);

		return {
			stack,
			yaml: `${getCommentPrefix()}${yamlWithInferLevels}`,
		};
	} else {
		addDirectionAndMutualStackToDependenciesInStack(stack);

		return { stack, yaml };
	}

	function getCommentPrefix() {
		const matches = yaml.match(/(?:#.*?\n)*/);

		return matches && matches[0];
	}
}

function renderStateful(
	stateful,
) {
	return (
		createResizableContainer({
			createElement,
			flexKeysAndValues:
				createHashFromLocation(location),
			items:
				[
					{
						element:
							createElement(
								"div",
								{
									style: {
										bottom: 0,
										left: 0,
										padding: "0.5em",
										position: "absolute",
										right: 0,
										top: 0,
									},
								},
								createYamlInputElement({
									createElement,
									createYamlEditorElement,
									stateful,
								}),
							),
					},
					{
						element:
							createYamlOutputElement({
								areDependenciesOfAncestorsIncluded:
									// replaced with literal
									// eslint-disable-next-line no-undef
									areDependenciesOfAncestorsIncludedPlaceholder,
								callOrCreateElementOnError,
								createElement,
								location,
								resizableElementTypes,
								stack:
									stateful.state.stack,
							}),
						flex: {
							default: 0.75,
							key: "output-width",
						},
					},
				],
			orientation:
				"vertical",
			resizableElementTypes,
		})
	);
}