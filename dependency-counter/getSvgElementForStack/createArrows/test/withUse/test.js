// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createArrows = require("../.."),
	{ createElement } = require("react"),
	createSvgElement = require("../createSvgElement"),
	createSymbolAndUseElementsAndGetSize = require("./createSymbolAndUseElementsAndGetSize"),
	path = require("path"),
	readTestCaseFile = require("../readTestCaseFile"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	withPrecision = require("../../../withPrecision");

test(
	"with default height and width of 24",
	() =>
		expectRenderedToBe({
			...createSymbolAndUseElementsAndGetSize({
				arrows:
					createArrows({
						createElement,
						withPrecision,
					}),
				createElement,
				spacing:
					4,
				width:
					24,
			}),
			testCase:
				"default-height",
		}),
);

test(
	"with descriptions",
	() => {
		const
			height = 120,
			spacing = 10,
			width = 120;

		const
			{ elements, size }
			=
			createSymbolAndUseElementsAndGetSize({
				arrows:
					createArrows({
						createElement,
						withPrecision,
					}),
				createElement,
				height,
				spacing,
				width,
			});

		expectRenderedToBe({
			elements:
				[
					createElement(
						"defs",
						{ key: "defs" },
						createElement(
							"style",
							{ type: "text/css" },
							"text{fill:white;font-family:arial;font-size:18px;text-anchor:middle}",
						),
					),
					...elements,
					...createDescriptionTexts(),
				],
			size,
			testCase:
				"with-descriptions",
		});

		// dy, x and y are attribute names in SVG
		/* eslint id-length: ["error", { "exceptions": ["dy", "x", "y"] }] */
		function createDescriptionTexts() {
			const
				center = width / 2,
				middle = height / 2;

			return (
				[
					[ "matches", "stack" ],
					[ "does not", "match stack" ],
					[ "is not", "independent" ],
				]
				.map(
					(textLines, index) =>
						createText({
							textLines,
							x: getXFromIndex(index),
						}),
				)
			);

			function createText({
				textLines,
				x,
			}) {
				return (
					createElement(
						"text",
						{
							dy: "-0.35em",
							key: textLines.join("\n"),
							y: middle,
						},
						textLines.map(
							(text, index) =>
								createTspan({
									isNotFirst: index,
									text,
									x,
								}),
						),
					)
				);
			}

			function getXFromIndex(
				index,
			) {
				return (
					center
					+
					(index * (width + spacing))
				);
			}

			function createTspan({
				isNotFirst,
				text,
				x,
			}) {
				return (
					createElement(
						"tspan",
						{
							...isNotFirst && { dy: "1.2em" },
							key: text,
							x,
						},
						text,
					)
				);
			}
		}
	},
);

async function expectRenderedToBe({
	elements,
	size,
	testCase,
}) {
	return (
		expect(
			renderToStaticMarkup(
				createSvgElement({
					createElement,
					elements,
					size,
				}),
			),
		)
		.toBe(
			await readTestCaseFile(
				path.join(
					__dirname,
					"testCases",
					`${testCase}.svg`,
				),
			),
		)
	);
}