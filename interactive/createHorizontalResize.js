/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		createElement,
		elements: { left, right },
		resizableElementTypes,
	}) =>
		createElement(
			resizableElementTypes.container,
			{ orientation: "vertical" },
			createElement(
				resizableElementTypes.element,
				{ flex: 0.35 },
				left,
			),
			createElement(
				resizableElementTypes.splitter,
				null,
				createElement("div", null, "|".repeat(3)),
			),
			createElement(
				resizableElementTypes.element,
				{ flex: 0.65 },
				right,
			),
		);