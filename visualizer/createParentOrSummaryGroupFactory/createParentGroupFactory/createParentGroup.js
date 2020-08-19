// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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