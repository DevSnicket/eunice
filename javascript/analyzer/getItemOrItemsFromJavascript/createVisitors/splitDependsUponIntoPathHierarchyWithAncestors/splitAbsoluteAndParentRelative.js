// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ initial, last } = require("lodash"),
	path = require("path");

const parentSegment = "..";

module.exports =
	({
		directoryPathRelative,
		identifier,
		items,
		pathSeparator,
	}) =>
		identifier
		.split(pathSeparator)
		.reduceRight(
			getOrCreateAbsoluteOrParentRelativeDependsUpon,
			{
				ancestorDirectoryNames:
					getAncestorNamesFromDirectoryPath(
						directoryPathRelative,
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
	identifierSegment,
	identifierIndex,
) {
	return (
		whenParentDirectory()
		||
		asChild()
	);

	function whenParentDirectory() {
		return (
			identifierSegment === parentSegment
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
				{ items: createDependsUponWithIdentifier(identifierSegment) }
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
						identifierIndex < ancestorDirectoryNames.length
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
							identifierIndex === 0
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
			throw Error(`Paths where a child "${identifierSegment}" is specified before a parent "${parentSegment}" are not supported.`);
		else
			return (
				{
					ancestorDirectoryNames,
					items:
						createDependsUponWithIdentifier(
							identifierSegment,
						),
				}
			);
	}

	function createDependsUponWithIdentifier(
		identifier,
	) {
		return whenHasItems() || identifier;

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