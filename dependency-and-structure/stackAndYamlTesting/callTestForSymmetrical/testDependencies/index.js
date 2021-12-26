// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import testDependencyBetweenTwoItemsInSameLevel from "./testDependencyBetweenTwoItemsInSameLevel";
import testDependsUponMapping from "./testDependsUponMapping";
import testFirstDependsUponSecondAndThird from "./testFirstDependsUponSecondAndThird";

export default
/** @type {import("../Parameter.d")} */
stackAndYamlTest =>
	describe(
		"dependencies",
		() => {
			testDependencyBetweenTwoItemsInSameLevel(stackAndYamlTest);
			testFirstDependsUponSecondAndThird(stackAndYamlTest);
			testDependsUponMapping(stackAndYamlTest);
		},
	);