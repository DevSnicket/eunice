/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default
/**
  * @param {Object} parameter
  * @param {import("./Parameter.d").Item} parameter.from
  * @param {import("./Parameter.d").Item} parameter.to
  * @returns {{direction: "above" | "below" | "same" | "self", mutualStack: import("./Parameter.d").Stack}}
  */
({
	from,
	to,
}) => {
	return (
		getWhenSame()
		||
		getWhenSameLevel()
		||
		getWhenSameStack()
		||
		getWhenToParent()
		||
		getWhenFromParent()
	);

	/** @returns {{direction: "self", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenSame() {
		return (
			from === to
			&&
			{
				direction: "self",
				mutualStack: from.level.stack,
			}
		);
	}

	/** @returns {{direction: "same", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenSameLevel() {
		return (
			from.level === to.level
			&&
			{
				direction: "same",
				mutualStack: from.level.stack,
			}
		);
	}

	function getWhenSameStack() {
		return (
			from.level.stack === to.level.stack
			&&
			getForStack(from.level.stack)
		);

		/**
		  * @param {import("./Parameter.d").Items & import("./Parameter.d").Stack} mutualStack
		  * @returns {{direction: "above"|"below", mutualStack: import("./Parameter.d").Stack}}
		  */
		function getForStack(
			mutualStack,
		) {
			return (
				{
					direction:
						getDirectionFromVector(
							getStackIndexOfItem(to)
							-
							getStackIndexOfItem(from),
						),
					mutualStack,
				}
			);

			function getStackIndexOfItem(
				{ level },
			) {
				return mutualStack.indexOf(level);
			}
		}
	}

	/** @returns {{direction: "below", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenToParent() {
		const toParent = to.level.stack.parent;

		return (
			from === toParent
			&&
			{
				direction: "below",
				mutualStack: toParent.items,
			}
		);
	}

	/** @returns {{direction: "above", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenFromParent() {
		const fromParent = from.level.stack.parent;

		return (
			fromParent === to
			&&
			{
				direction: "above",
				mutualStack: fromParent.items,
			}
		);
	}
};

function getDirectionFromVector(
	vector,
) {
	/* istanbul ignore else: error is only thrown when there is gap in the implementation */
	if (vector < 0)
		return "above";
	else if (vector > 0)
		return "below";
	else
		throw new Error(`Unexpected vector of "${vector}".`);
}