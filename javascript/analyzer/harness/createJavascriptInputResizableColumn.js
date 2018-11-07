module.exports =
	({
		createResizableColumnForInput,
		createStateFromValue = null,
		state,
	}) =>
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
				state.javascript,
		});