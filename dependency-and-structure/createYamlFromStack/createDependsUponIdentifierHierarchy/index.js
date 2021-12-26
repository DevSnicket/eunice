// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createLinear from "./createLinear";
import createTree from "./createTree";

export default
dependsUpon => {
	return (
		whenSingle()
		||
		createTree(dependsUpon)
	);

	function whenSingle() {
		return (
			dependsUpon.length === 1
			&&
			createLinear(dependsUpon[0])
		);
	}
};