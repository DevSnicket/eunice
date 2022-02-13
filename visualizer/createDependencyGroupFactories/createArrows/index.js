/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDownSymbol from "./createDownSymbol";
import createRightSymbol from "./createRightSymbol";
import createUpSymbol from "./createUpSymbol";

const
	colorsDefault =
		{
			/* cspell:disable-next-line */
			green: "darkgreen",
			/* cspell:disable-next-line */
			red: "darkred",
		},
	height =
		24,
	marginAndPaddingForVertical =
		{
			horizontalMargin: 10,
			paddingRight: 0,
		};

export default ({
	colors: { red, green } = colorsDefault,
	createElement,
	withPrecision,
}) =>
	(
		{
			down:
				createDown({
					createElement,
					fill: green,
					id: formatId("down"),
				}),
			right:
				createRight({
					createElement,
					fill: red,
					id: formatId("right"),
				}),
			up:
				createUp({
					createElement,
					fill: red,
					id: formatId("up"),
					withPrecision,
				}),
		}
	);

function formatId(
	id,
) {
	return `${id}-arrow`;
}

function createDown({
	createElement,
	fill,
	id,
}) {
	return (
		{
			...marginAndPaddingForVertical,
			height,
			id,
			symbol:
				createDownSymbol({
					createElement,
					fill,
					id,
				}),
		}
	);
}

function createRight({
	createElement,
	fill,
	id,
}) {
	return (
		{
			height,
			horizontalMargin: 9,
			id,
			paddingRight: 3,
			symbol:
				createRightSymbol({
					createElement,
					fill,
					id,
				}),
		}
	);
}

function createUp({
	createElement,
	fill,
	id,
	withPrecision,
}) {
	return (
		{
			...marginAndPaddingForVertical,
			height,
			id,
			symbol:
				createUpSymbol({
					createElement,
					fill,
					id,
					withPrecision,
				}),
		}
	);
}