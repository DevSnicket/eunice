/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	stack => {
		return whenSingleLevel() || stack;

		function whenSingleLevel() {
			return (
				stack.length === 1
				&&
				getLevelOrSingleItem(stack[0])
			);
		}
	};

function getLevelOrSingleItem(
	level,
) {
	return whenSingleItem() || level;

	function whenSingleItem() {
		return (
			level.length === 1
			&&
			level[0]
		);
	}
}