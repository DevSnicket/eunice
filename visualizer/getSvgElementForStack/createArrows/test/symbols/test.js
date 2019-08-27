// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createArrows = require("../.."),
	{ createElement } = require("react"),
	path = require("path"),
	readTestCaseFile = require("../readTestCaseFile"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	withPrecision = require("../../../withPrecision");

test.each(
	[ "down", "right", "up" ],
)(
	"%s renders SVG",
	async direction =>
		expect(
			renderToStaticMarkup(
				createArrows({
					createElement,
					withPrecision,
				})[direction]
				.symbol,
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