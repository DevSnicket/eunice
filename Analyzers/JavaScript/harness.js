const
	{ createElement } = require("react");

const
	createColumnFactoryFromStateful = require("../../Harnesses/createColumnFactoryFromStateful"),
	createContainerForColumns = require("../../Harnesses/createContainerForColumns"),
	getYamlFromJavaScript = require("./getYamlFromJavaScript"),
	renderComponent = require("../../Harnesses/renderComponent");

renderComponent({
	render() {
		const columnFactory = createColumnFactoryFromStateful(this);

		return (
			createContainerForColumns(
				columnFactory.createJavascriptInputResizableColumn(),
				columnFactory.createResizableColumn({
					element:
						createElement(
							"pre",
							{
								style:
									{
										flex: 1,
										overflow: "scroll",
									},
							},
							createElement(
								"code",
								{ id: "yaml" },
								getYamlFromJavaScript(this.state.javascript)
							)
						),
					title: "YAML",
				})
			)
		);
	},
	state:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
});