/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const orderItemsByIndexOf = require("../orderItemsByIndex");

module.exports =
	({
		items,
		identifierSuffixesInOrder,
	}) => {
		return (
			orderItemsByIndexOf({
				getItemIndex:
					item =>
						getWhenIndexOrDefault(
							getItemIndex(item),
						),
				items,
			})
		);

		function getItemIndex(
			item,
		) {
			return (
				item.id
				?
				identifierSuffixesInOrder.findIndex(
					suffix => item.id.endsWith(suffix),
				)
				:
				-1
			);
		}

		function getWhenIndexOrDefault(
			index,
		) {
			return (
				index === -1
				?
				identifierSuffixesInOrder.length
				:
				index
			);
		}
	};