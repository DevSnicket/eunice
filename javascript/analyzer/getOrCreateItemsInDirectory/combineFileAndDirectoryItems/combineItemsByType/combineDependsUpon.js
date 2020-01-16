// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createPropertyWhenAny = require("./createPropertyWhenAny");

module.exports =
	items =>
		createPropertyWhenAny({
			name:
				"dependsUpon",
			values:
				items.flatMap(getDependsUponFromItem),
		});

function getDependsUponFromItem(
	{ dependsUpon },
) {
	return dependsUpon || [];
}