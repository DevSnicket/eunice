const
	createProcessorsMenuElements = require("./createProcessorsMenuElements"),
	processorPlugins = require("../processorPlugins");

module.exports =
	({
		createElement,
		resizableColumn,
		stateful,
	}) => {
		return (
			{
				createJavascriptInputResizableColumn:
					(
						{ createStateFromValue = null }
						=
						{},
					) =>
						createResizableColumnForInput({
							createStateFromValue:
								value => (
									{
										...createStateFromValue && createStateFromValue(value),
										javascript: value,
									}
								),
							title:
								"JavaScript",
							value:
								stateful.state.javascript,
						}),
				createResizableColumn,
				createResizableColumnForOutput,
				createYamlInputResizableColumn:
					() =>
						createResizableColumnForInput({
							createStateFromValue:
								value => ({ yaml: value }),
							title:
								createYamlTitleElement({
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
						}),
			}
		);

		function createResizableColumnForInput({
			createStateFromValue,
			title,
			value,
		}) {
			return (
				createResizableColumn({
					element:
						createElement(
							"textarea",
							{
								onChange: event => stateful.setState(createStateFromValue(event.target.value)),
								value,
							},
						),
					title,
				})
			);
		}

		function createResizableColumnForOutput({
			title,
			value,
		}) {
			return (
				createResizableColumn({
					element:
						createElement(
							"div",
							{ style: { flex: 1 } },
							value,
						),
					title,
				})
			);
		}

		function createResizableColumn({
			element,
			title,
		}) {
			return (
				createElement(
					resizableColumn,
					{ key: `${title} column` },
					createElement(
						"div",
						{ className: "column" },
						title,
						element,
					),
				)
			);
		}
	};

function createYamlTitleElement({
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