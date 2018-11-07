const
	createColumnFactory = require("./createColumnFactory"),
	createContainerForColumns = require("./createContainerForColumns"),
	{ ReflexElement } = require("react-reflex"),
	renderComponent = require("./renderComponent");

module.exports =
	({
		createColumns,
		initialState,
	}) => {
		renderComponent({
			render() {
				return (
					createContainerForColumns(
						createColumns({
							columnFactory:
								createColumnFactory({
									resizableColumn: ReflexElement,
									stateful: this,
								}),
							stateful: this,
						}),
					)
				);
			},
			state:
				initialState,
		});
	};