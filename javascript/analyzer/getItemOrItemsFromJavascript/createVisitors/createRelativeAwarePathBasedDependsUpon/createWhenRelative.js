// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	({
		items,
		sourceDirectoryRelativePath,
		targetPathSegments,
	}) =>
		isRelativePathSegment(targetPathSegments[0])
		&&
		resolveFirstRelativePathSegment({
			sourceDirectoryRelativePath,
			targetPathSegments,
		})
		.reduceRight(
			(itemsInHierarchy, pathSegment) =>
				getOrCreateParentDependsUpon({
					items:
						itemsInHierarchy,
					pathSegment,
				}),
			items,
		);

function resolveFirstRelativePathSegment({
	sourceDirectoryRelativePath,
	targetPathSegments,
}) {
	return (
		whenHasIdentifiableParent()
		||
		targetPathSegments
	);

	function whenHasIdentifiableParent() {
		return (
			sourceDirectoryRelativePath
			&&
			replaceFirstRelativePathSegment()
		);

		function replaceFirstRelativePathSegment() {
			const [ , ...tail ] = targetPathSegments;

			return [
				path.basename(sourceDirectoryRelativePath),
				...tail,
			];
		}
	}
}

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
			isRelativePathSegment(pathSegment)
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

function isRelativePathSegment(
	pathSegment,
) {
	return pathSegment === ".";
}