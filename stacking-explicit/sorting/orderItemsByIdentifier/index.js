/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	items => {
		return whenArray() || items;

		function whenArray() {
			return (
				Array.isArray(items)
				&&
				items.sort(
					(left, right) =>
						compareIdentifiers(
							getItemIdentifier(left),
							getItemIdentifier(right),
						),
				)
			);
		}
	};

function getItemIdentifier(
	item,
) {
	return item.id;
}

function compareIdentifiers(
	left,
	right,
) {
	return (
		left !== right
		&&
		(whenNoValues() || compareValues())
	);

	function whenNoValues() {
		return (
			(!left && -1)
			||
			(!right && 1)
		);
	}

	function compareValues() {
		return left < right ? -1 : 1;
	}
}