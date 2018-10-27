module.exports =
	({
		ancestors,
		subsetIdentifierHierarchy,
	}) => {
		return (
			ancestors.reduce(
				getAggregate(),
				[],
			)
		);

		function getAggregate() {
			return (
				subsetIdentifierHierarchy
				?
				withSubsetIdentifierHierarchy(subsetIdentifierHierarchy)
				.aggregateAncestorIdentifiersInSubset
				:
				aggregateWhenAllIdentifiable
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

function aggregateWhenAllIdentifiable(
	identifiers,
	ancestor,
) {
	return (
		identifiers
		&&
		ancestor.id
		&&
		[ ...identifiers, ancestor.id ]
	);
}