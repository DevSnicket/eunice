// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import initial from "lodash/initial";
import last from "lodash/last";
import path from "path";

const parentSegment = "..";

export default ({
	items,
	sourceDirectoryRelativePath,
	targetPathSegments,
}) =>
	targetPathSegments
	.reduceRight(
		getOrCreateAbsoluteOrParentRelativeDependsUpon,
		{
			ancestorDirectoryNames:
				getAncestorNamesFromDirectoryPath(
					sourceDirectoryRelativePath,
				),
			items,
		},
	)
	.items;

function getAncestorNamesFromDirectoryPath(
	directoryPath,
) {
	return (
		directoryPath
		&&
		initial(
			directoryPath
			.split(path.sep),
		)
	);
}

function getOrCreateAbsoluteOrParentRelativeDependsUpon(
	{
		ancestorDirectoryNames,
		items,
		isInParentDirectory,
	},
	pathSegment,
	pathSegmentIndex,
) {
	return (
		whenParentDirectory()
		||
		asChild()
	);

	function whenParentDirectory() {
		return (
			pathSegment === parentSegment
			&&
			{
				...createAncestorDirectoryNamesAndItems(),
				isInParentDirectory: true,
			}
		);

		function createAncestorDirectoryNamesAndItems() {
			return (
				whenNamedParent()
				||
				{ items: createDependsUponWithIdentifier(pathSegment) }
			);

			function whenNamedParent() {
				return (
					hasNamesForAncestors()
					&&
					asNamedParent()
				);

				function hasNamesForAncestors() {
					return (
						ancestorDirectoryNames
						&&
						pathSegmentIndex < ancestorDirectoryNames.length
					);
				}

				function asNamedParent() {
					return (
						{
							ancestorDirectoryNames:
								initial(ancestorDirectoryNames),
							items:
								getDependsUponWhenBaseAncestor()
								||
								items,
						}
					);

					function getDependsUponWhenBaseAncestor() {
						return (
							pathSegmentIndex === 0
							&&
							createDependsUponWithIdentifier(
								last(ancestorDirectoryNames),
							)
						);
					}
				}
			}
		}
	}

	function asChild() {
		if (isInParentDirectory)
			throw Error(`Paths where a child "${pathSegment}" is specified before a parent "${parentSegment}" are not supported.`);
		else
			return (
				{
					ancestorDirectoryNames,
					items:
						createDependsUponWithIdentifier(
							pathSegment,
						),
				}
			);
	}

	function createDependsUponWithIdentifier(
		identifier,
	) {
		return (
			whenHasItems()
			||
			identifier
		);

		function whenHasItems() {
			return (
				items
				&&
				{
					id: identifier,
					items,
				}
			);
		}
	}
}