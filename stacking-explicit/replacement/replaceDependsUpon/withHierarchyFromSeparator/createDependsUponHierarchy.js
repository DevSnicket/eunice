// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	({
		dependsUpon,
		identifierSeparator,
	}) =>
		withIdentifierSeparator(
			identifierSeparator,
		)
		.replaceDependsUpon(
			dependsUpon,
		);

function withIdentifierSeparator(
	identifierSeparator,
) {
	return { replaceDependsUpon };

	function replaceDependsUpon(
		dependsUpon,
	) {
		return (
			whenString()
			||
			whenArray()
			||
			whenHasIdentifier()
			||
			dependsUpon
		);

		function whenString() {
			return (
				typeof dependsUpon === "string"
				&&
				splitIdentifierIntoHierarchy({
					identifier: dependsUpon,
					items: null,
				})
			);
		}

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.map(replaceDependsUpon)
			);
		}

		function whenHasIdentifier() {
			return (
				dependsUpon
				&&
				dependsUpon.id
				&&
				splitIdentifierIntoHierarchy({
					identifier: dependsUpon.id,
					items: replaceDependsUpon(dependsUpon.items),
				})
			);
		}
	}

	function splitIdentifierIntoHierarchy({
		identifier,
		items,
	}) {
		return (
			identifier
			.split(identifierSeparator)
			.reduceRight(
				(childItems, identifierSegment) =>
					childItems
					?
					{
						id: identifierSegment,
						items: childItems,
					}
					:
					identifierSegment,
				items,
			)
		);
	}
}