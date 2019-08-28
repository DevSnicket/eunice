// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		outputBaseFileName,
		outputDirectoryPath,
	}) => (
		{
			baseFileName:
				getWhenDefinedOrDefault(outputBaseFileName, "eunice"),
			directoryPath:
				getWhenDefinedOrDefault(outputDirectoryPath, "."),
		}
	);

function getWhenDefinedOrDefault(
	argument,
	defaultValue,
) {
	return (
		// property wont be defined by minimalist package
		// eslint-disable-next-line no-undefined
		argument === undefined
		?
		defaultValue
		:
		argument
	);
}