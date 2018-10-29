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
			ancestor.id
			&&
			(whenInSubset() || whenMatchesSubset())
		);

		function whenInSubset() {
			return (
				index >= subsetIdentifierHierarchy.length
				&&
				[ ...identifiers, ancestor.id ]
			);
		}

		function whenMatchesSubset() {
			return (
				subsetIdentifierHierarchy[index] === ancestor.id
				&&
				identifiers
			);
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