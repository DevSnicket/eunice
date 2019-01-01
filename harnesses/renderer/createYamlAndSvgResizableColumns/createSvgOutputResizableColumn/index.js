const
	callOrCreateElementOnError = require("@devsnicket/eunice-test-harnesses/callOrCreateElementOnError"),
	{ getInteractiveElementsForYaml } = require("@devsnicket/eunice-renderer"),
	getProcessedYamlFromState = require("./getProcessedYamlFromState");

module.exports =
	({
		createElement,
		createResizableColumnForOutput,
		location,
		state,
	}) =>
		createResizableColumnForOutput({
			title:
				"SVG",
			value:
				callOrCreateElementOnError({
					action:
						() =>
							getInteractiveElementsForYaml({
								locationHash: location.hash,
								yaml: getProcessedYamlFromState(state),
							}),
					createElement,
				}),
		});