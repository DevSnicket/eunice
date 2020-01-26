// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

const relativeSegment = ".";

module.exports =
	({
		items,
		sourceDirectoryRelativePath,
		targetPathSegments,
	}) => {
		return (
			targetPathSegments[0] === relativeSegment
			&&
			(whenAnyPathSegments() || whenHasDirectory())
		);

		function whenAnyPathSegments() {
			return (
				targetPathSegments.length > 1
				&&
				targetPathSegments
				.reduceRight(
					(itemsInHierarchy, pathSegment) =>
						getOrCreateParentDependsUpon({
							items:
								itemsInHierarchy,
							pathSegment,
						}),
					items,
				)
			);
		}

		function whenHasDirectory() {
			return (
				sourceDirectoryRelativePath
				&&
				getOrCreateParentDependsUpon({
					items,
					pathSegment:
						path.basename(sourceDirectoryRelativePath),
				})
			);
		}
	};

function getOrCreateParentDependsUpon({
	pathSegment,
	items,
}) {
	return (
		whenRelativeSegment()
		||
		whenHasItems()
		||
		pathSegment
	);

	function whenRelativeSegment() {
		return (
			pathSegment === relativeSegment
			&&
			items
		);
	}

	function whenHasItems() {
		return (
			items
			&&
			{
				id: pathSegment,
				items,
			}
		);
	}
}