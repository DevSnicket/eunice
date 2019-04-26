const
	{
		createFillWithTitleElement,
		createTextareaElement,
	} = require("@devsnicket/eunice-test-harnesses");

module.exports =
	({
		createStateFromValue = null,
		stateful,
	}) =>
		createFillWithTitleElement({
			content:
				createTextareaElement({
					setStateFromValue:
						value =>
							stateful.setState({
								...createStateFromValue && createStateFromValue(value),
								javascript: value,
							}),
					value:
						stateful.state.javascript,
				}),
			title:
				"JavaScript",
		});