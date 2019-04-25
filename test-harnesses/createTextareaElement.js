const { createElement } = require("react");

module.exports =
	({
		setStateFromValue,
		value,
	}) =>
		createElement(
			"textarea",
			{
				onChange: event => setStateFromValue(event.target.value),
				value,
				wrap: "off",
			},
		);