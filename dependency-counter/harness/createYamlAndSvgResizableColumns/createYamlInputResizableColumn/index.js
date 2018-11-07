const
	createProcessorsMenuElements = require("./createProcessorsMenuElements"),
	processorPlugins = require("../../processorPlugins");

module.exports =
	({
		createElement,
		createResizableColumnForInput,
		stateful,
	}) =>
		createResizableColumnForInput({
			createStateFromValue:
				value => ({ yaml: value }),
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
			value:
				stateful.state.yaml,
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