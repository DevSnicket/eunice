const createParameterTextareas = require("./createParameterTextareas");

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
				...createParameterTextareas({
					createElement,
					processor,
					setState,
				}),
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
	};