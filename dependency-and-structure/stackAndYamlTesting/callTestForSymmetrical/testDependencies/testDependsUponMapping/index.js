/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import testDependencyPermeable from "./testDependencyPermeable";
import testDependsUponMissingChildInMissingParent from "./testDependsUponMissingChildInMissingParent";
import testDependsUponMissingGrandchildInMissingChildInMissingParent from "./testDependsUponMissingGrandchildInMissingChildInMissingParent";
import testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent from "./testDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInMissingParent";
import testDependsUponTwoMissingChildrenInMissingParent from "./testDependsUponTwoMissingChildrenInMissingParent";
import testFirstDependsUponChildAndMissingChildInSecond from "./testFirstDependsUponChildAndMissingChildInSecond";
import testFirstDependsUponChildInSecond from "./testFirstDependsUponChildInSecond";
import testFirstDependsUponChildInSecondAndSecond from "./testFirstDependsUponChildInSecondAndSecond";
import testFirstDependsUponGrandchildInSecond from "./testFirstDependsUponGrandchildInSecond";
import testFirstDependsUponGrandchildInSecondAndChildInSecond from "./testFirstDependsUponGrandchildInSecondAndChildInSecond";
import testFirstDependsUponMissingChildInSecond from "./testFirstDependsUponMissingChildInSecond";
import testFirstDependsUponMissingChildInSecondAndSecond from "./testFirstDependsUponMissingChildInSecondAndSecond";
import testFirstDependsUponMissingGrandchildInMissingChildInSecond from "./testFirstDependsUponMissingGrandchildInMissingChildInSecond";
import testFirstDependsUponMissingGrandchildInSecond from "./testFirstDependsUponMissingGrandchildInSecond";
import testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond from "./testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond";
import testFirstDependsUponTwoChildrenInSecond from "./testFirstDependsUponTwoChildrenInSecond";
import testFirstDependsUponTwoChildrenInSecondAndSecond from "./testFirstDependsUponTwoChildrenInSecondAndSecond";
import testFirstDependsUponTwoGrandchildrenInChildInSecond from "./testFirstDependsUponTwoGrandchildrenInChildInSecond";
import testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond from "./testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond";
import testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond from "./testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond";
import testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond from "./testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond";

export default
/** @type {import("../../Parameter.d")} */
stackAndYamlTest =>
	describe(
		"depends upon mapping",
		() => {
			testDependencyPermeable(stackAndYamlTest);
			testDependsUponMissingChildInMissingParent(stackAndYamlTest);
			testDependsUponMissingGrandchildInMissingChildInMissingParent(stackAndYamlTest);
			testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent(stackAndYamlTest);
			testDependsUponTwoMissingChildrenInMissingParent(stackAndYamlTest);
			testFirstDependsUponChildAndMissingChildInSecond(stackAndYamlTest);
			testFirstDependsUponChildInSecond(stackAndYamlTest);
			testFirstDependsUponChildInSecondAndSecond(stackAndYamlTest);
			testFirstDependsUponGrandchildInSecond(stackAndYamlTest);
			testFirstDependsUponGrandchildInSecondAndChildInSecond(stackAndYamlTest);
			testFirstDependsUponMissingChildInSecond(stackAndYamlTest);
			testFirstDependsUponMissingChildInSecondAndSecond(stackAndYamlTest);
			testFirstDependsUponMissingGrandchildInMissingChildInSecond(stackAndYamlTest);
			testFirstDependsUponMissingGrandchildInSecond(stackAndYamlTest);
			testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond(stackAndYamlTest);
			testFirstDependsUponTwoChildrenInSecond(stackAndYamlTest);
			testFirstDependsUponTwoChildrenInSecondAndSecond(stackAndYamlTest);
			testFirstDependsUponTwoGrandchildrenInChildInSecond(stackAndYamlTest);
			testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond(stackAndYamlTest);
			testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond(stackAndYamlTest);
			testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond(stackAndYamlTest);
		},
	);