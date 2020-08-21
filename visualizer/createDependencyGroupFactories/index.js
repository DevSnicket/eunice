// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createArrows from "./createArrows";
import createGetOuterCountFromAreAncestorsIncluded from "./createGetOuterCountFromAreAncestorsIncluded";
import createInner from "./createInner";
import createOuter from "./createOuter";

export default ({
	areAncestorsIncluded,
	createElement,
	createTextGroup,
	elementContainerFactory,
	font,
	withPrecision,
}) =>
	createWithArrowsAndGetOuter({
		arrows:
			createArrows({
				createElement,
				withPrecision,
			}),
		createTextGroup,
		elementContainerFactory,
		font,
		getOuterCount:
			createGetOuterCountFromAreAncestorsIncluded(
				areAncestorsIncluded,
			),
	});

function createWithArrowsAndGetOuter({
	arrows,
	createTextGroup,
	elementContainerFactory,
	font,
	getOuterCount,
}) {
	return {
		createInner:
			({
				count,
				keyPrefix,
			}) =>
				createInner({
					arrows,
					count,
					createTextGroup,
					font,
					keyPrefix,
				}),
		createInnerFromItem,
		createOuterFromItem,
		symbols:
			Object.values(arrows)
			.map(arrow => arrow.symbol),
	};

	function createInnerFromItem({
		item: { dependencyCount },
		keyPrefix,
	}) {
		return (
			dependencyCount
			&&
			createInner({
				arrows,
				count:
					dependencyCount.descendants,
				createTextGroup,
				font,
				keyPrefix,
			})
		);
	}

	function createOuterFromItem({
		contentGroupFactory,
		item,
	}) {
		return (
			createOuter({
				arrows,
				contentGroupFactory,
				createTextGroup,
				elementContainerFactory,
				font,
				item,
				outerCount:
					getOuterCountFromItem(item),
			})
		);
	}

	function getOuterCountFromItem(
		{ dependencyCount },
	) {
		return (
			dependencyCount
			&&
			getOuterCount(dependencyCount)
		);
	}
}