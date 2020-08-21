// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyCountsFromItem from "./createDependencyCountsFromItem";
import sumDependencyCounts from "./sumDependencyCounts";

/**
  * @param {import("./Item.d")} item
  * @return {import("./DependencyCount.d")}
  */
export default
item =>
	sumDependencyCounts(
		createDependencyCountsFromItem(
			item,
		),
	);