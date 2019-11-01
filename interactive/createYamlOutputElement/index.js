// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createElementsFromYaml = require("./createElementsFromYaml"),
	{ createHashFromLocation } = require("@devsnicket/eunice-test-harnesses"),
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
						locationHash: createHashFromLocation(location),
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