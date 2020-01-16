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
						getOrCreateParentDependsUpon,
						items,
					)
				);
			}

			function whenHasDirectory() {
				return (
					directoryPathRelative
					&&
					path.basename(directoryPathRelative)
				);
			}
		}
	};

function getOrCreateParentDependsUpon(
	items,
	identifierSegment,
) {
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