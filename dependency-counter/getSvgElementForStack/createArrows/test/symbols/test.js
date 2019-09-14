// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createArrows = require("../.."),
	{ createElement } = require("react"),
	createSvgElement = require("../createSvgElement"),
	path = require("path"),
	readTestCaseFile = require("../readTestCaseFile"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	withPrecision = require("../../../withPrecision");

const size = { height: 14, width: 14 };

test.each(
	[ "down", "right", "up" ],
)(
	"%s renders SVG",
	async direction =>
		expect(
			renderToStaticMarkup(
				createSvgElement({
					createElement,
					elements:
						[
							createArrows({
								createElement,
								withPrecision,
							})[direction]
							.symbol,
							createElement(
								"use",
								{
									height: size.height,
									href: `#${direction}-arrow`,
									width: size.width,
								},
							),
						],
					size,
				}),
			),
		)
		.toBe(
			await readTestCaseFile(
				path.join(
					__dirname,
					"testCases",
					`${direction}.svg`,
				),
			),
		),
);