// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

const relativeSegment = ".";

module.exports =
	({
		directoryPathRelative,
		identifier,
		items,
		pathSeparator,
	}) => {
		return (
			isRelative()
			&&
			getOrCreateDependsUponForIdentifierSegments(
				identifier.split(pathSeparator),
			)
		);

		function isRelative() {
			return (
				identifier[0] === relativeSegment
				&&
				(identifier.length === 1 || identifier[1] === pathSeparator)
			);
		}

		function getOrCreateDependsUponForIdentifierSegments(
			identifierSegments,
		) {
			return (
				whenHasIdentifierSegments()
				||
				whenHasDirectory()
			);

			function whenHasIdentifierSegments() {
				return (
					identifierSegments.length > 1
					&&
					identifierSegments
					.reduceRight(
						(itemsInHierarchy, identifierSegment) =>
							getOrCreateParentDependsUpon({
								identifierSegment,
								items:
									itemsInHierarchy,
							}),
						items,
					)
				);
			}

			function whenHasDirectory() {
				return (
					directoryPathRelative
					&&
					getOrCreateParentDependsUpon({
						identifierSegment:
							path.basename(directoryPathRelative),
						items,
					})
				);
			}
		}
	};

function getOrCreateParentDependsUpon({
	identifierSegment,
	items,
}) {
	return (
		identifierSegment === relativeSegment
		?
		items
		:
		whenHasItems() || identifierSegment
	);

	function whenHasItems() {
		return (
			items
			&&
			{
				id: identifierSegment,
				items,
			}
		);
	}
}