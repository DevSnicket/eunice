// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createProcessorsMenuElements = require("./createProcessorsMenuElements"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

module.exports =
	({
		createElement,
		createFillWithTitleElement,
		createYamlEditorElement,
		stateful,
	}) =>
		createFillWithTitleElement({
			content:
				createYamlEditorElement({
					foldAll:
						true,
					setStateFromValue:
						value => stateful.setState({ yaml: value }),
					value:
						stateful.state.yaml,
				}),
			title:
				createTitleElement({
					createElement,
					processorsMenuElements:
						createProcessorsMenuElements({
							createElement,
							processors:
								stateful.state.processors || [ ...processorPlugins ],
							setProcessors:
								processors => stateful.setState({ processors }),
						}),
				}),
		});

function createTitleElement({
	createElement,
	processorsMenuElements,
}) {
	return (
		createElement(
			"div",
			{
				style:
					{
						display: "flex",
						flexFlow: "wrap",
					},
			},
			createElement(
				"span",
				{ style: { flexGrow: 1 } },
				"YAML",
			),
			...processorsMenuElements,
		)
	);
}