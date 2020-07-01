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
	safeDump as formatYaml,
	safeLoad as parseYaml,
} from "js-yaml";

import createCodeEditorForLanguage from "@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createYamlInputElement from "./createYamlInputElement";
import createYamlOutputElement from "./createYamlOutputElement";
import inferStacks from "@devsnicket/eunice-stacking-inference";
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
		// replaced with literal
		// eslint-disable-next-line no-undef
		{ yaml: inferStacksWhenConfigured(yamlLiteralPlaceholder) },
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
								createElement(
									"div",
									{
										style:
											{
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

function inferStacksWhenConfigured(
	yaml,
) {
	return whenConfigured() || yaml;

	function whenConfigured() {
		return (
			// replaced with literal
			// eslint-disable-next-line no-undef
			isInferStacksEnabledLiteralPlaceholder
			&&
			formatYaml(
				inferStacks(
					parseYaml(
						yaml,
					),
				),
			)
		);
	}
}