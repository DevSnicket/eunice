// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

const identifier = "item";

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[ [ {
				dependsUpon: [ { item: identifier } ],
				id: identifier,
			} ] ],
		),
	yaml:
		createItemYaml({
			dependsUpon: identifier,
			id: identifier,
		}),
});