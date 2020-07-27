// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	ReflexContainer,
	ReflexElement,
	ReflexSplitter,
} from "react-reflex";

import {
	callOrCreateElementOnError,
	createHashFromLocation,
	createResizableContainer,
	renderIntoContainerElement,
} from "@devsnicket/eunice-test-harnesses";

import {
	createStackFromYaml,
	createYamlFromStack,
} from "@devsnicket/eunice-dependency-and-structure";

import {
	safeDump as formatYaml,
	safeLoad as parseYaml,
} from "js-yaml";

import countDependenciesInStack from "@devsnicket/eunice-dependency-counter";
import createCodeEditorForLanguage from "@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createYamlInputElement from "./createYamlInputElement";
import createYamlOutputElement from "./createYamlOutputElement";
import inferStacksInStack from "@devsnicket/eunice-stacking-inference";
import initializeCodeEditorGlobal from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/initializeGlobal";

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
	const stack =
		createStackFromYaml(
			parseYaml(
				yaml,
			),
		);

	// replaced with literal
	// eslint-disable-next-line no-undef
	if (isInferStacksEnabledLiteralPlaceholder) {
		inferStacksInStack(stack);

		const yamlWithInferLevels =
			formatYaml(
				createYamlFromStack(stack),
				{ lineWidth: Number.MAX_SAFE_INTEGER },
			);

		countDependenciesInStack(stack);

		return {
			stack,
			yaml: yamlWithInferLevels,
		};
	} else {
		countDependenciesInStack(stack);

		return { stack, yaml };
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