/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import fs from "fs";
import getAncestorIdentifiersWhenValid from "./getAncestorIdentifiersWhenValid";
import { safeLoad as parseYaml } from "js-yaml";
import path from "path";

export default ({
	ancestors,
	directory,
	stackFileName,
	subsetIdentifierHierarchy,
}) => {
	const ancestorIdentifiers =
		getAncestorIdentifiersWhenValid({
			ancestors,
			subsetIdentifierHierarchy,
		});

	return (
		ancestorIdentifiers
		&&
		getIdentifiersInNewStackFromPath(
			getStackFilePath(),
		)
	);

	function getStackFilePath() {
		return (
			path.join(
				directory,
				...ancestorIdentifiers,
				stackFileName,
			)
		);
	}
};

function getIdentifiersInNewStackFromPath(
	stackFilePath,
) {
	return (
		fs.existsSync(stackFilePath)
		&&
		readStack()
	);

	function readStack() {
		return (
			parseYaml(
				fs.readFileSync(
					stackFilePath,
					"utf-8",
				),
			)
		);
	}
}