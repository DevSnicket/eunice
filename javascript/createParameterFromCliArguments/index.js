// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	convertKebabToCamelCase = require("./convertKebabToCamelCase"),
	createStructureAndEnsureTypes = require("./createStructureAndEnsureTypes");

module.exports =
	({
		cliArguments,
		pathSeparator,
	}) =>
		createStructureAndEnsureTypes({
			...convertKebabToCamelCase(
				cliArguments,
			),
			pathSeparator,
		});