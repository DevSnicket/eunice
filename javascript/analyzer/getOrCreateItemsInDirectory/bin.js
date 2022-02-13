#!/usr/bin/env node
/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import callWithProcessStandardStreams from "../callWithProcessStandardStreams";
import getOrCreateItemsInDirectory from ".";
import getYamlForItemOrItems from "../getYamlForItemOrItems";
import path from "path";

callWithProcessStandardStreams({
	action:
		async({
			directory,
			ignorePathPattern,
			...restOfProcessArguments
		}) =>
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory,
					ignorePathPattern:
						createRegularExpressionFromPathPattern(
							ignorePathPattern,
						),
					...restOfProcessArguments,
				}),
			),
});

function createRegularExpressionFromPathPattern(
	pattern,
) {
	return (
		pattern
		&&
		new RegExp(
			pattern.replace(
				/\//g,
				path.sep.replace("\\", "\\\\"),
			),
		)
	);
}