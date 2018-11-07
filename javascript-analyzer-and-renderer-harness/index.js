const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	createColumnFactory = require("../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../Harnesses/createContainerForColumns"),
	createJavascriptInputResizableColumn = require("../javascript-analyzer/harness/createJavascriptInputResizableColumn"),
	createYamlAndSvgResizableColumns = require("../Renderer/harness/createYamlAndSvgResizableColumns"),
	getYamlFromJavaScript =	require("../javascript-analyzer/getYamlFromJavaScript"),
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
				createJavascriptInputResizableColumn({
					createResizableColumnForInput: columnFactory.createResizableColumnForInput,
					createStateFromValue: value => ({ yaml: getYamlFromJavaScript(value) }),
					state: this.state,
				}),
				...createYamlAndSvgResizableColumns({
					columnFactory,
					createElement,
					stateful: this,
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