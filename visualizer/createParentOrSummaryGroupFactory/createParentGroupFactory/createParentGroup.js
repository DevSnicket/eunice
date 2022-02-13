/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import borderThickness from "./borderThickness";
import stackMargin from "./stackMargin";

export default ({
	createElement,
	createTextGroup,
	height,
	identifier,
	innerDependencyGroupFactory,
	left,
	stackGroupFactory,
	top,
	width,
}) => {
	const
		center =
			width / 2;

	return (
		[
			createBorderRectangle(),
			createIdentifierGroup(),
			stackGroupFactory.createAtPosition({
				left:
					left + stackMargin + borderThickness,
				top:
					top + stackMargin + identifier.height,
			}),
			...createInnerDependencyGroupWithBackgroundRectangle(),
		]
	);

	// x and y are attribute names in SVG
	/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
	function createBorderRectangle() {
		const margin =
			borderThickness / 2;

		return (
			createElement(
				"rect",
				{
					height:
						height - borderThickness,
					key:
						"border",
					style:
						createStyle(),
					width:
						width - borderThickness,
					x:
						left + margin,
					y:
						top + margin,
				},
			)
		);

		function createStyle() {
			return {
				fill:
					"none",
				stroke:
					color,
				strokeWidth:
					borderThickness,
			};
		}
	}

	function createIdentifierGroup() {
		return (
			createTextGroup({
				attributes:
					{ style: { fill: color } },
				className:
					identifier.className,
				elementName:
					"rect",
				height:
					identifier.height,
				key:
					identifier.text,
				left,
				padding:
					createPadding(),
				text:
					identifier.text,
				top,
				width,
			})
		);

		function createPadding() {
			return {
				left:
					center,
				top:
					identifier.height / 2,
			};
		}
	}

	function * createInnerDependencyGroupWithBackgroundRectangle() {
		const backgroundTop =
			top
			+
			identifier.height
			+
			stackMargin
			+
			stackGroupFactory.height
			+
			stackMargin;

		if (innerDependencyGroupFactory)
			yield (
				[
					createBackgroundRectangle(),
					createInnerDependencyGroup(),
				]
			);

		function createBackgroundRectangle() {
			return (
				createElement(
					"rect",
					{
						height:
							innerDependencyGroupFactory.height
							+
							borderThickness,
						key:
							"inner dependency background",
						style:
							{ fill: color },
						width,
						x:
							left,
						y:
							backgroundTop,
					},
				)
			);
		}

		function createInnerDependencyGroup() {
			return (
				innerDependencyGroupFactory
				.createAtPosition({
					left:
						left + center,
					top:
						backgroundTop
						+
						borderThickness,
				})
			);
		}
	}
};

const color = "lightgrey"; // cspell:disable-line