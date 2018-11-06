const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	createColumnFactory = require("../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../Harnesses/createContainerForColumns"),
	createSvgOutputResizableColumn = require("../Renderer/harness/createSvgOutputResizableColumn"),
	renderComponent = require("../Harnesses/renderComponent");

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
				columnFactory.createJavascriptInputResizableColumn({ createStateFromValue: value => ({ yaml: getYamlFromJavaScript(value) }) }),
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
	state:
		// javascriptFromWebpack is replaced with literal by webpack.config.js
		// eslint-disable-next-line no-undef
		createStateFromJavascript(javascriptFromWebpack),
});

function createStateFromJavascript(
	javascript,
) {
	return (
		{
			javascript,
			yaml: getYamlFromJavaScript(javascript),
		}
	);
}