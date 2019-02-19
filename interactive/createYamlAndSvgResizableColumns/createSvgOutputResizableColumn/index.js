const
	{ callOrCreateElementOnError } = require("@devsnicket/eunice-test-harnesses"),
	getInteractiveElementsForYaml = require("./getInteractiveElementsForYaml"),
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