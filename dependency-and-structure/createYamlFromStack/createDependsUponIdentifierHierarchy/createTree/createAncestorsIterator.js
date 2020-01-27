// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue");

module.exports =
	ancestors => {
		return (
			createWhenAny()
			||
			createEmptyIterator()
		);

		function createWhenAny() {
			const identifiers = whenHasAncestors();

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
	};

function createIteratorForIterable(
	iterable,
) {
	return iterable[Symbol.iterator]();
}

function createEmptyIterator() {
	return { next: () => ({}) };
}