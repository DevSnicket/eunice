const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	callOrCreateErrorElement = require("../Harnesses/callOrCreateErrorElement"),
	createColumnFactory = require("../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../Harnesses/createContainerForColumns"),
	getInteractiveElementsForYaml = require("../Renderer/getInteractiveElementsForYaml"),
	getProcessedYamlFromState = require("../Harnesses/getProcessedYamlFromState"),
	getYamlFromJavaScript = require("../javascript-analyzer/getYamlFromJavaScript"),
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
				columnFactory.createSvgOutputResizableColumn(
					callOrCreateErrorElement({
						action:
							() =>
								getInteractiveElementsForYaml({
									locationHash: location.hash,
									yaml: getProcessedYamlFromState(this.state),
								}),
						createElement,
					}),
				),
			)
		);
	},
	state:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
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