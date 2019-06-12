const
	getIdentifierPropertyOrValue = require("../../getIdentifierPropertyOrValue"),
	getIdentifiersBetweenParentAndAncestor = require("./getIdentifiersBetweenParentAndAncestor");

module.exports =
	({
		ancestor,
		ancestors,
		item,
	}) => {
		return (
			createWhenAny()
			||
			createEmptyIterator()
		);

		function createWhenAny() {
			const identifiers = whenHasAncestors() || whenHasAncestor();

			return (
				identifiers
				&&
				createIteratorForIterable(identifiers.reverse())
			);
		}

		function whenHasAncestors() {
			return (
				ancestors
				&&
				ancestors.map(getIdentifierPropertyOrValue)
			);
		}

		function whenHasAncestor() {
			return (
				ancestor
				&&
				[
					...getIdentifiersBetweenParentAndAncestor({
						ancestor,
						item,
					}),
				]
			);
		}
	};

function createIteratorForIterable(
	iterable,
) {
	return iterable[Symbol.iterator]();
}

function createEmptyIterator() {
	return { next: () => ({}) };
}