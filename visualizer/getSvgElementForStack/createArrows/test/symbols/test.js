// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDownSymbol = require("../../createDownSymbol"),
	{ createElement } = require("react"),
	createRightSymbol = require("../../createRightSymbol"),
	createSvgElement = require("../createSvgElement"),
	createUpSymbol = require("../../createUpSymbol"),
	path = require("path"),
	readTestCaseFile = require("../readTestCaseFile"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	withPrecision = require("../../../withPrecision");

test(
	"down renders SVG",
	() =>
		assertExpectedFile({
			element:
				createDownSymbol({
					createElement,
					id: "down-arrow",
				}),
			testCase:
				"down",
		}),
);

test.each(
	[ "07", "d0", "ff" ],
)(
	"down in SVG 10x10 with luminescence %s",
	luminescence => {
		const
			id = "bullet-point",
			size = { height: 10, width: 10 };

		assertExpectedFile({
			element:
				createSvgElement({
					createElement,
					elements:
						[
							createDownSymbol({
								createElement,
								fill: `#${luminescence}${luminescence}${luminescence}`,
								id,
							}),
							createElement(
								"use",
								{
									height: size.height,
									href: `#${id}`,
									key: "use",
									width: size.width,
								},
							),
						],
					size,
				}),
			testCase:
				`down-10x10-${luminescence}l`,
		});
	},
);

test(
	"right renders SVG",
	() =>
		assertExpectedFile({
			element:
				createRightSymbol({
					createElement,
					id: "right-arrow",
				}),
			testCase:
				"right",
		}),
);

test(
	"up renders SVG",
	() =>
		assertExpectedFile({
			element:
				createUpSymbol({
					createElement,
					id: "up-arrow",
					withPrecision,
				}),
			testCase:
				"up",
		}),
);

async function assertExpectedFile({
	element,
	testCase,
}) {
	expect(
		renderToStaticMarkup(element),
	)
	.toBe(
		await readTestCaseFile(
			path.join(
				__dirname,
				"testCases",
				`${testCase}.svg`,
			),
		),
	);
}