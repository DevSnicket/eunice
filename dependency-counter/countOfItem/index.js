// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createCountsForDescendants from "./createCountsForDescendants";
import sumItemCounts from "./sumItemCounts";

/**
  * @param {import("./Item.d")} item
  * @return {import("../Counts.d").OfItem}
  */
export default
item =>
	sumItemCounts(
		createCountsForDescendants(
			item,
		),
	);