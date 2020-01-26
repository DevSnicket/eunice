// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createForAbsoluteAndParentRelative = require("./createForAbsoluteAndParentRelative"),
	createWhenRelative = require("./createWhenRelative");

module.exports =
	({
		items,
		sourceDirectoryRelativePath,
		targetPath,
	}) => {
		return whenHasTargetPath() || items;

		function whenHasTargetPath() {
			return (
				targetPath
				&&
				createFromSegments({
					items,
					sourceDirectoryRelativePath,
					targetPathSegments:
						splitPath(targetPath),
				})
			);
		}
	};

function splitPath(
	path,
) {
	return (
		path
		.split("/")
		.filter(segment => segment)
	);
}

function createFromSegments({
	sourceDirectoryRelativePath,
	items,
	targetPathSegments,
}) {
	return (
		createWhenRelative({
			items,
			sourceDirectoryRelativePath,
			targetPathSegments,
		})
		||
		createForAbsoluteAndParentRelative({
			items,
			sourceDirectoryRelativePath,
			targetPathSegments,
		})
	);
}