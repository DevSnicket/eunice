const
	createYamlAndSvgResizableColumns = require("./createYamlAndSvgResizableColumns"),
	{ renderHarness } = require("@devsnicket/eunice-test-harnesses");

renderHarness({
	createColumns:
		({
			columnFactory,
			stateful,
		}) =>
			createYamlAndSvgResizableColumns({
				columnFactory,
				stateful,
			}),
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	initialState: { yaml: yamlFromWebpack },
});