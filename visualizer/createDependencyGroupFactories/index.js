// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createArrows from "./createArrows";
import createInner from "./createInner";
import createOuter from "./createOuter";

export default ({
	createElement,
	createTextGroup,
	elementContainerFactory,
	font,
	withPrecision,
}) => {
	const
		arrows =
			createArrows({
				createElement,
				withPrecision,
			});

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
		createOuter:
			({
				contentGroupFactory,
				item,
			}) =>
				createOuter({
					arrows,
					contentGroupFactory,
					createTextGroup,
					elementContainerFactory,
					font,
					item,
				}),
		symbols:
			Object.values(arrows)
			.map(arrow => arrow.symbol),
	};
};