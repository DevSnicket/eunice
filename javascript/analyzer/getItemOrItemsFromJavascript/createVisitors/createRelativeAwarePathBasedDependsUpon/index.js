// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createForAbsoluteAndParentRelative from "./createForAbsoluteAndParentRelative";
import createWhenRelative from "./createWhenRelative";

export default ({
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