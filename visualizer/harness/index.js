const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	createColumnFactory = require("../../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../../Harnesses/createContainerForColumns"),
	createSvgOutputResizableColumn = require("./createSvgOutputResizableColumn"),
	renderComponent = require("../../Harnesses/renderComponent");

renderComponent({
	render() {
		const columnFactory =
			createColumnFactory({
				createElement,
				resizableColumn: ReflexElement,
				stateful: this,
			});

		return (
			createContainerForColumns(
				columnFactory.createYamlInputResizableColumn(),
				createSvgOutputResizableColumn({
					createElement,
					createResizableColumnForOutput: columnFactory.createResizableColumnForOutput,
					location,
					state: this.state,
				}),
			)
		);
	},
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	state: { yaml: yamlFromWebpack },
});