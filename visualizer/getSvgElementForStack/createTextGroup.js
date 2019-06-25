/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
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
		withPrecision,
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