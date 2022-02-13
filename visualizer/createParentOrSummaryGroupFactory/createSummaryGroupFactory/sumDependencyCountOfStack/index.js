/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import getDependsUponOfParent from "./getDependsUponOfParent";
import { sumDirections } from "../../../../dependency-counter";

export default
stack =>
	getCountWhenHasMultiple(
		stack
		.flat(2)
		.reduce(
			(
				{ count, hasMultiple },
				item,
			) => {
				const itemCount =
					sumCountOfItem(item);

				return (
					{
						count:
							sumDirections(
								count,
								itemCount,
							),
						hasMultiple:
							hasMultiple
							||
							(count && itemCount),
					}
				);
			},
			{},
		),
	);

function sumCountOfItem(
	{ dependencyCount },
) {
	return (
		dependencyCount
		&&
		sumDescendantsAndParentDependsUpon(dependencyCount)
	);
}

function sumDescendantsAndParentDependsUpon({
	descendants,
	parent,
}) {
	return (
		sumDirections(
			descendants,
			parent && getDependsUponOfParent(parent),
		)
	);
}

function getCountWhenHasMultiple({
	count,
	hasMultiple,
}) {
	return (
		hasMultiple
		&&
		count
	);
}