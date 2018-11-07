const
	callOrCreateErrorElement = require("./callOrCreateErrorElement"),
	getInteractiveElementsForYaml = require("../../../getInteractiveElementsForYaml"),
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
				callOrCreateErrorElement({
					action:
						() =>
							getInteractiveElementsForYaml({
								locationHash: location.hash,
								yaml: getProcessedYamlFromState(state),
							}),
					createElement,
				}),
		});