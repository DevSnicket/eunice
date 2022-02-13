/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	items,
	withSingleInArray,
}) => {
	return (
		any()
		&&
		(getWhenSingle() || stack())
	);

	function any() {
		return (
			items
			&&
			items.length
		);
	}

	function getWhenSingle() {
		return (
			items.length === 1
			&&
			getSingle()
		);

		function getSingle() {
			return (
				withSingleInArray
				?
				items
				:
				items[0]
			);
		}
	}

	function stack() {
		return items.map(item => [ item ]);
	}
};