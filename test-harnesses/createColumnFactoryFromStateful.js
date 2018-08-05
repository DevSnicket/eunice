const
	{ ReflexElement } = require("react-reflex"),
	{ createElement } = require("react");

module.exports =
	stateful => {
		return (
			{
				createJavascriptInputResizableColumn:
					(
						{ createStateFromValue = null }
						=
						{}
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
				createSvgOutputResizableColumn:
					svg =>
						createResizableColumnForOutput({
							title: "SVG",
							value: svg,
						}),
				createYamlInputResizableColumn:
					() =>
						createResizableColumnForInput({
							createStateFromValue: value => ({ yaml: value }),
							title: "YAML",
							value: stateful.state.yaml,
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
							}
						),
					title,
				})
			);
		}
	};

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
					value
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
			ReflexElement,
			{ key: `${title} column` },
			createElement(
				"div",
				{ className: "column" },
				title,
				element
			)
		)
	);
}