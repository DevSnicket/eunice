// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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

import createCodeEditorForLanguage from "@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage";
import { createElement } from "react";
import createYamlInputElement from "./createYamlInputElement";
import createYamlOutputElement from "./createYamlOutputElement";
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
		// yamlFromWebpack is replaced with literal by webpack.config.js
		// eslint-disable-next-line no-undef
		{ yaml: yamlFromWebpack },
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
								createYamlInputElement({
									createElement,
									createFillWithTitleElement,
									createYamlEditorElement,
									stateful,
								}),
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