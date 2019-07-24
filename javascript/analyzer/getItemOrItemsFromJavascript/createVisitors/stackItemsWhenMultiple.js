/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
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