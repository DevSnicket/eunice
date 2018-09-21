const
	createColumnFactoryFromStateful = require("../Harnesses/createColumnFactoryFromStateful"),
	createContainerForColumns = require("../Harnesses/createContainerForColumns"),
	getInteractiveElementsForYaml = require("./getInteractiveElementsForYaml"),
	getProcessedYamlFromState = require("../Harnesses/getProcessedYamlFromState"),
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
						yaml: getProcessedYamlFromState(this.state),
					}),
				),
			)
		);
	},
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	state: { yaml: yamlFromWebpack },
});