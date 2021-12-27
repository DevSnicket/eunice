// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import aggregateGroupFactoriesCenteredHorizontally from "./aggregateGroupFactoriesCenteredHorizontally";
import createDirectionGroupFactories from "./createDirectionGroupFactories";

export default
({
	arrows,
	count,
	createTextGroup,
	font,
	keyPrefix,
}) =>
	count
	&&
	aggregateGroupFactoriesCenteredHorizontally(
		createDirectionGroupFactories({
			arrows,
			count,
			createTextGroup,
			font,
			keyPrefix,
		}),
	);