/* Eunice
Copyright (c) 2020 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

const
	escapeRegExp = require("lodash/escapeRegExp"),
	path = require("path");

require("@babel/register")(
	{ ignore: createIgnore() },
);

function createIgnore() {
	return [ new RegExp(formatPattern(), "i") ];

	function formatPattern() {
		const separator = escapeRegExp(path.sep);

		return `^${getAbsolutePath()}${getSubdirectories()}node_modules${separator}(?!@devsnicket)`;

		function getAbsolutePath() {
			return escapeRegExp(path.resolve("."));
		}

		function getSubdirectories() {
			return `(?:${separator}.*)?${separator}`;
		}
	}
}