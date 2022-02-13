/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createArrows from "./createArrows";
import createGetOuterCountFromAreAncestorsIncluded from "./createGetOuterCountFromAreAncestorsIncluded";
import createInner from "./createInner";
import createOuter from "./createOuter";

export default ({
	areAncestorsIncluded,
	createElement,
	createTextGroup,
	elementContainerFactory,
	font,
	withPrecision,
}) =>
	createWithArrowsAndGetOuter({
		arrows:
			createArrows({
				createElement,
				withPrecision,
			}),
		createTextGroup,
		elementContainerFactory,
		font,
		getOuterCount:
			createGetOuterCountFromAreAncestorsIncluded(
				areAncestorsIncluded,
			),
	});

function createWithArrowsAndGetOuter({
	arrows,
	createTextGroup,
	elementContainerFactory,
	font,
	getOuterCount,
}) {
	return {
		createInner:
			({
				count,
				keyPrefix,
			}) =>
				createInner({
					arrows,
					count,
					createTextGroup,
					font,
					keyPrefix,
				}),
		createInnerFromItem,
		createOuterFromItem,
		symbols:
			Object.values(arrows)
			.map(arrow => arrow.symbol),
	};

	function createInnerFromItem({
		item: { dependencyCount },
		keyPrefix,
	}) {
		return (
			dependencyCount
			&&
			createInner({
				arrows,
				count:
					dependencyCount.descendants,
				createTextGroup,
				font,
				keyPrefix,
			})
		);
	}

	function createOuterFromItem({
		contentGroupFactory,
		item,
	}) {
		return (
			createOuter({
				arrows,
				contentGroupFactory,
				createTextGroup,
				elementContainerFactory,
				font,
				item,
				outerCount:
					getOuterCountFromItem(item),
			})
		);
	}

	function getOuterCountFromItem(
		{ dependencyCount },
	) {
		return (
			dependencyCount
			&&
			getOuterCount(dependencyCount)
		);
	}
}