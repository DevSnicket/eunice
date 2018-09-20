const
	createColumnFactoryFromStateful = require("../Harnesses/createColumnFactoryFromStateful"),
	createContainerForColumns = require("../Harnesses/createContainerForColumns"),
	getInteractiveElementsForYaml = require("./getInteractiveElementsForYaml"),
	renderComponent = require("../Harnesses/renderComponent");

renderComponent({
	render() {
		const columnFactory = createColumnFactoryFromStateful(this);

		return (
			createContainerForColumns(
				columnFactory.createYamlInputResizableColumn(),
				columnFactory.createSvgOutputResizableColumn(
					getInteractiveElementsForYaml({
						locationHash: location.hash,
						yaml: this.state.yaml,
					}),
				),
			)
		);
	},
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	state: { yaml: yamlFromWebpack },
});