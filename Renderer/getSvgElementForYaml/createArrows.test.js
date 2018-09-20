const
	{ createElement } = require("react"),
	fs = require("fs"),
	path = require("path"),
	{ renderToStaticMarkup } = require("react-dom/server");

const
	createArrows = require("./createArrows"),
	withPrecision = require("./withPrecision");

test(
	"createArrows",
	() =>
		expect(
			renderArrows(
				createArrows({ createElement, withPrecision }),
			),
		)
		.toBe(
			readFile(path.join(__dirname, "createArrows.testcase.svg")),
		),
);

function renderArrows(
	arrows,
) {
	return (
		renderToStaticMarkup(
			createElement(
				"svg",
				{
					height: 26,
					width: 63.88,
					xmlns: "http://www.w3.org/2000/svg",
				},
				[
					...getElements(),
					...getUses(),
				],
			),
		)
	);

	function getElements() {
		return (
			Object.values(arrows)
			.map(arrow => arrow.element)
		);
	}

	// x and y are attribute names in SVG
	/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
	function getUses() {
		const padding = 2;

		return (
			[ arrows.down, arrows.up, arrows.right ]
			.reduce(
				aggregate,
				{ elements: [], left: padding },
			)
			.elements
		);

		function aggregate(
			aggregation,
			arrow,
		) {
			const width = 8 + arrow.horizontalMargin;

			return (
				{
					elements:
						[
							...aggregation.elements,
							createUse(),
						],
					left:
						aggregation.left + width + padding,
				}
			);

			function createUse() {
				return (
					createElement(
						"use",
						{
							height: arrow.height,
							href: `#${arrow.id}`,
							key: arrow.id,
							width,
							x: aggregation.left,
							y: padding,
						},
					)
				);
			}
		}
	}
}

function readFile(
	filePath,
) {
	return (
		fs.readFileSync(
			filePath,
			"utf-8",
		)
		.replace(
			/^\uFEFF/, // BOM
			"",
		)
	);
}