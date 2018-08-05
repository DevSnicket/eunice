const
	createColumnFactoryFromStateful = require("./Harnesses/createColumnFactoryFromStateful"),
	createContainerForColumns = require("./Harnesses/createContainerForColumns"),
	getSvgElementFromYamlOrErrorElement = require("./Renderer/getSvgElementFromYamlOrErrorElement"),
	getYamlFromJavaScript = require("./Analyzers/JavaScript/getYamlFromJavaScript"),
	renderComponent = require("./Harnesses/renderComponent");

renderComponent({
	render() {
		const columnFactory = createColumnFactoryFromStateful(this);

		return (
			createContainerForColumns(
				columnFactory.createJavascriptInputResizableColumn({ createStateFromValue: value => ({ yaml: getYamlFromJavaScript(value) }) }),
				columnFactory.createYamlInputResizableColumn(),
				columnFactory.createSvgOutputResizableColumn(
					getSvgElementFromYamlOrErrorElement(this.state.yaml)
				)
			)
		);
	},
	state:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		createStateFromJavascript(javascriptFromWebpack),
});

function createStateFromJavascript(
	javascript
) {
	return (
		{
			javascript,
			yaml: getYamlFromJavaScript(javascript),
		}
	);
}