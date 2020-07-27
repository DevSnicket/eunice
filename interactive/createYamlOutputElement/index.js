// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createElementsFromYaml from "./createElementsFromYaml";
import { createHashFromLocation } from "@devsnicket/eunice-test-harnesses";

export default ({
	callOrCreateElementOnError,
	createElement,
	location,
	resizableElementTypes,
	stack,
}) =>
	callOrInProductionCreateElementOnError({
		action:
			() =>
				createElementsFromYaml({
					createElement,
					locationHash: createHashFromLocation(location),
					resizableElementTypes,
					stack,
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