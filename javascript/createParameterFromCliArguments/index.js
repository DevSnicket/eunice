// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import convertKebabToCamelCase from "./convertKebabToCamelCase";
import createStructureAndEnsureTypes from "./createStructureAndEnsureTypes";

export default ({
	cliArguments,
	pathSeparator,
}) =>
	createStructureAndEnsureTypes({
		...convertKebabToCamelCase(
			cliArguments,
		),
		pathSeparator,
	});