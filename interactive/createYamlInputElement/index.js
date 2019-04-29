const
	createProcessorsMenuElements = require("./createProcessorsMenuElements"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	{
		createFillWithTitleElement,
		createTextareaElement,
	} = require("@devsnicket/eunice-test-harnesses");

module.exports =
	({
		createElement,
		stateful,
	}) =>
		createFillWithTitleElement({
			content:
				createTextareaElement({
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