// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	areDependenciesOfAncestorsIncluded,
	isInferStacksEnabled,
	mode,
	yamlFilePath,
}) =>
	[
		{
			pattern:
				"areDependenciesOfAncestorsIncludedPlaceholder",
			replacement:
				areDependenciesOfAncestorsIncluded,
		},
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