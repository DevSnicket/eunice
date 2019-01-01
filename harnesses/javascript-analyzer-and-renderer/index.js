const
	{ createJavascriptInputResizableColumn } = require("@devsnicket/eunice-javascript-analyzer").harness,
	createYamlAndSvgResizableColumns = require("../renderer/createYamlAndSvgResizableColumns"),
	{ getYamlFromJavaScript } = require("@devsnicket/eunice-javascript-analyzer"),
	{ renderHarness } = require("@devsnicket/eunice-test-harnesses");

renderHarness({
	createColumns:
		({
			columnFactory,
			stateful,
		}) =>
			[
				createJavascriptInputResizableColumn({
					createResizableColumnForInput:
						columnFactory.createResizableColumnForInput,
					createStateFromValue:
						value =>
							({
								yaml:
									callOrGetMessageOnError(
										() => getYamlFromJavaScript(value),
									),
							}),
					state:
						stateful.state,
				}),
				...createYamlAndSvgResizableColumns({
					columnFactory,
					stateful,
				}),
			],
	initialState:
		// javascriptFromWebpack is replaced with literal by webpack.config.js
		// eslint-disable-next-line no-undef
		createInitialStateFromJavascript(javascriptFromWebpack),
});

function callOrGetMessageOnError(
	action,
) {
	try {
		return action();
	} catch (error) {
		return error.message;
	}
}

function createInitialStateFromJavascript(
	javascript,
) {
	return (
		{
			javascript,
			yaml: getYamlFromJavaScript(javascript),
		}
	);
}