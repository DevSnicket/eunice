/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import withPrecision from "./withPrecision";

export default
// x and y are attribute names in SVG
/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
({
	attributes,
	className,
	createElement,
	elementName,
	elementsBelowText,
	fontSize,
	height,
	key,
	left,
	padding,
	text,
	top,
	width,
}) => {
	return (
		createElement(
			"g",
			{
				...className && { className },
				key,
			},
			[
				createShape(),
				createText(),
				...elementsBelowText || [],
			],
		)
	);

	function createShape() {
		return (
			createElement(
				elementName,
				{
					...attributes,
					height: withPrecision(height),
					key: "shape",
					width: withPrecision(width),
					...left > 0 && { x: withPrecision(left) },
					...top > 0 && { y: withPrecision(top) },
				},
			)
		);
	}

	function createText() {
		return (
			createElement(
				"text",
				{
					key: "text",
					x: withPrecision(left + padding.left),
					y: withPrecision(getTextTop()),
				},
				text,
			)
		);
	}

	function getTextTop() {
		return (
			top
			+
			padding.top
			+
			(fontSize * 0.36)
		);
	}
};