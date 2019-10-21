// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	extensions => {
		return (
			whenHasExtensions()
			||
			(filePath => filePath)
		);

		function whenHasExtensions() {
			return (
				extensions
				&&
				getExtensionAndRemoveFromFilePath
			);

			function getExtensionAndRemoveFromFilePath(
				filePath,
			) {
				return (
					removeExtension({
						extension: getExtension({ extensions, filePath }),
						filePath,
					})
				);
			}
		}
	};

function getExtension({
	extensions,
	filePath,
}) {
	return (
		filePath
		&&
		extensions.find(extension => filePath.endsWith(extension))
	);
}

function removeExtension({
	extension,
	filePath,
}) {
	return whenHasExtension() || filePath;

	function whenHasExtension() {
		return (
			extension
			&&
			filePath.substring(
				0,
				filePath.length - extension.length,
			)
		);
	}
}