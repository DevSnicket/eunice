// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getItemOrItemsFromJavascript from "../getItemOrItemsFromJavascript";
import getYamlForItemOrItems from "../getYamlForItemOrItems";

export default
/** @param {import("../getItemOrItemsFromJavascript/Parameter.d")} parameter */
parameter =>
	getYamlForItemOrItems(
		getItemOrItemsFromJavascript(
			parameter,
		),
	);