// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	({
		ancestors,
		subsetIdentifierHierarchy,
	}) => {
		return (
			subsetIdentifierHierarchy
			?
			whenInSubset()
			:
			whenAllIdentifiable(ancestors)
		);

		function whenInSubset() {
			return (
				ancestors.length >= subsetIdentifierHierarchy.length
				&&
				ancestors.reduce(
					withSubsetIdentifierHierarchy(subsetIdentifierHierarchy)
					.aggregateAncestorIdentifiersInSubset,
					[],
				)
			);
		}
	};

function withSubsetIdentifierHierarchy(
	subsetIdentifierHierarchy,
) {
	return { aggregateAncestorIdentifiersInSubset };

	function aggregateAncestorIdentifiersInSubset(
		identifiers,
		ancestor,
		index,
	) {
		return (
			identifiers
			&&
			whenIdentifiableOrInSubset()
		);

		function whenIdentifiableOrInSubset() {
			return (
				isInSubset()
				?
				whenIdentifiable()
				:
				whenSubsetMatch()
			);
		}

		function isInSubset() {
			return index >= subsetIdentifierHierarchy.length;
		}

		function whenIdentifiable() {
			return (
				ancestor.id
				&&
				[ ...identifiers, ancestor.id ]
			);
		}

		function whenSubsetMatch(
		) {
			return (
				isSubsetMatch()
				&&
				identifiers
			);

			function isSubsetMatch() {
				const subsetIdentifier = subsetIdentifierHierarchy[index];

				return (
					subsetIdentifier === ancestor.id
					||
					(!subsetIdentifier && !ancestor.id)
				);
			}
		}
	}
}

function whenAllIdentifiable(
	ancestors,
) {
	return (
		ancestors.reduce(
			(
				identifiers,
				ancestor,
			) =>
				identifiers
				&&
				ancestor.id
				&&
				[ ...identifiers, ancestor.id ],
			[],
		)
	);
}