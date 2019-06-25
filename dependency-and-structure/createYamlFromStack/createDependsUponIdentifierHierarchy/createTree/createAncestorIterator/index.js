/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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