const
	{ callOrCreateElementOnError } = require("@devsnicket/eunice-test-harnesses"),
	createElementsFromYaml = require("./createElementsFromYaml"),
	getProcessedYamlFromState = require("./getProcessedYamlFromState");

module.exports =
	({
		createElement,
		location,
		state,
	}) =>
		callOrInProductionCreateElementOnError({
			action:
				() =>
					createElementsFromYaml({
						createElement,
						locationHash: location.hash,
						yaml: getProcessedYamlFromState(state),
					}),
			createElement,
		});

function callOrInProductionCreateElementOnError({
	action,
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