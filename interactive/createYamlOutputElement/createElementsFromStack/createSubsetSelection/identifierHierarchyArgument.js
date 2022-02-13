/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default {
	format:
		identifierHierarchy =>
			identifierHierarchy
			.map(
				identifier =>
					identifier || anonymous,
			)
			.join(separator),
	parse:
		identifierHierarchy =>
			identifierHierarchy
			.split(separator)
			.map(
				identifier =>
					identifier === "undefined"
					?
					// the item id property wont be defined
					// eslint-disable-next-line no-undefined
					undefined
					:
					identifier,
			),
};

const
	anonymous = "undefined",
	separator = "/";