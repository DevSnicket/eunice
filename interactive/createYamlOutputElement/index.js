const
	createElementsFromYaml = require("./createElementsFromYaml"),
	getProcessedYamlFromState = require("./getProcessedYamlFromState");

module.exports =
	({
		callOrCreateElementOnError,
		createElement,
		location,
		resizableElementTypes,
		state,
	}) =>
		callOrInProductionCreateElementOnError({
			action:
				() =>
					createElementsFromYaml({
						createElement,
						locationHash: location.hash,
						resizableElementTypes,
						yaml: getProcessedYamlFromState(state),
					}),
			callOrCreateElementOnError,
			createElement,
		});

function callOrInProductionCreateElementOnError({
	action,
	callOrCreateElementOnError,
	createElement,
}) {
	return (
		// this is the only place process environment is used
		// eslint-disable-next-line no-process-env
		process.env.NODE_ENV === "production"
		?
		callOrCreateElementOnError({
			action,
			createElement,
		})
		:
		action()
	);
}