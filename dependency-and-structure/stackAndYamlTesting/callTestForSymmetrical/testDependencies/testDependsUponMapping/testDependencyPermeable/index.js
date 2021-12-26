// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import testFirstDependsUponChildOfPermeableSecondInParent from "./testFirstDependsUponChildOfPermeableSecondInParent";
import testFirstDependsUponChildOfSecond from "./testFirstDependsUponChildOfSecond";
import testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent from "./testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent";
import testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent from "./testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent";
import testFirstDependsUponGrandchildOfSecondWithPermeableChild from "./testFirstDependsUponGrandchildOfSecondWithPermeableChild";
import testFirstDependsUponSameIdentifierAsGrandchild from "./testFirstDependsUponSameIdentifierAsGrandchild";

export default
/** @type {import("../../../Parameter.d")} */
stackAndYamlTest =>
	describe(
		"dependency permeable",
		() => {
			testFirstDependsUponChildOfPermeableSecondInParent(stackAndYamlTest);
			testFirstDependsUponChildOfSecond(stackAndYamlTest);
			testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent(stackAndYamlTest);
			testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent(stackAndYamlTest);
			testFirstDependsUponGrandchildOfSecondWithPermeableChild(stackAndYamlTest);
			testFirstDependsUponSameIdentifierAsGrandchild(stackAndYamlTest);
		},
	);