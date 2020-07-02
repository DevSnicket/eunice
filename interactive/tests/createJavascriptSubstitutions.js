// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	isInferStacksEnabled,
	mode,
	yamlFilePath,
}) =>
	[
		{
			pattern:
				"isInferStacksEnabledLiteralPlaceholder",
			replacement:
				isInferStacksEnabled,
		},
		{
			escape:
				mode !== "production",
			pattern:
				"yamlLiteralPlaceholder",
			replacementFilePath:
				yamlFilePath,
		},
	];