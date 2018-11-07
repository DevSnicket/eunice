const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	createColumnFactory = require("../../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../../Harnesses/createContainerForColumns"),
	createYamlAndSvgResizableColumns = require("./createYamlAndSvgResizableColumns"),
	renderComponent = require("../../Harnesses/renderComponent");

renderComponent({
	render() {
		return (
			createContainerForColumns(
				...createYamlAndSvgResizableColumns({
					columnFactory:
						createColumnFactory({
							createElement,
							resizableColumn: ReflexElement,
							stateful: this,
						}),
					createElement,
					stateful: this,
				}),
			)
		);
	},
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	state: { yaml: yamlFromWebpack },
});