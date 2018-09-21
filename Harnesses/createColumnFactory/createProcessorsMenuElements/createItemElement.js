module.exports =
	({
		createElement,
		processor,
		setState,
	}) => {
		return (
			createElement(
				"li",
				{ style: { display: "flex" } },
				createElement(
					"label",
					null,
					createCheckbox(),
					processor.text,
				),
				createTextareaWhenParameterized(),
			)
		);

		function createCheckbox() {
			return (
				createElement(
					"input",
					{
						onChange:
							event =>
								setState({ isEnabled: event.target.checked }),
						type:
							"checkbox",
					},
				)
			);
		}

		function createTextareaWhenParameterized() {
			return (
				processor.parameter
				&&
				createElement(
					"textarea",
					{
						onChange:
							event =>
								setState({ argument: event.target.value }),
						rows:
							1,
						style:
							{
								flexGrow: 1,
								marginLeft: "1em",
								minWidth: "8em",
							},
					},
				)
			);
		}
	};