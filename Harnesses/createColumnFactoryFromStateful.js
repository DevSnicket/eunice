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
							createStateFromValue:
								value => ({ yaml: value }),
							title:
								createElement(
									"div",
									{ style: { display: "flex", flexFlow: "wrap" } },
									createElement("span", { style: { flexGrow: 1 } }, "YAML"),
									...createProcessorMenuElements()
								),
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

function createProcessorMenuElements() {
	const
		className = "popup menu",
		inputId = "processor-menu";

	return (
		[
			createElement(
				"input",
				{
					className,
					id: inputId,
					type: "checkbox",
				}
			),
			createElement(
				"label",
				{
					className,
					for: inputId,
				},
				"processors"
			),
			createElement(
				"ul",
				{
					className,
					style: { flexBasis: "100%" },
				},
				createProcessorMenuItemElements()
			),
		]
	);
}

function createProcessorMenuItemElements() {
	return (
		createProcessorMenuItems()
		.map(
			menuItem =>
				createElement(
					"li",
					null,
					createElement(
						"label",
						null,
						createElement("input", { type: "checkbox" }),
						menuItem.text
					),
					menuItem.elements
				)
		)
	);
}

function createProcessorMenuItems() {
	return (
		[
			{ elements: createElement("input"), text: "group items by identifier separator " },
			{ elements: createElement("input"), text: "order items by type " },
			{ elements: createElement("input"), text: "set type of root items " },
			{ elements: createElement("input"), text: "stack root items " },
			{ text: "unstack independent" },
		]
	);
}