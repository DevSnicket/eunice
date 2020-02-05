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

/** @type {[ { green: string, red: string }, string ][]} */
const testCases =
	[
		// eslint-disable-next-line no-undefined
		[ undefined, undefined ],
		[
			{
				green: "#00A000",
				red: "#C00000",
			},
			"dark",
		],
	];

test.each(testCases)(
	"colors %j, default height and width of 24",
	(colors, testCaseDirectory) =>
		expectRenderedToBe({
			...createSymbolAndUseElementsAndGetSize({
				arrows:
					createArrows({
						colors,
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
				{
					directory: testCaseDirectory,
					file: "default-height",
				},
		}),
);

test.each(testCases)(
	"colors %j with descriptions",
	async(colors, testCaseDirectory) => {
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
						colors,
						createElement,
						withPrecision,
					}),
				createElement,
				height,
				spacing,
				width,
			});

		await expectRenderedToBe({
			elements:
				[
					createElement(
						"defs",
						{ key: "defs" },
						createElement(
							"style",
							{ type: "text/css" },
							"text{fill:white;font-family:arial;font-size:16px;text-anchor:middle}",
						),
					),
					...elements,
					...createDescriptionTexts(),
				],
			size,
			testCase:
				{
					directory: testCaseDirectory,
					file: "with-descriptions",
				},
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
					...[
						__dirname,
						"test-cases",
						...testCase.directory ? [ testCase.directory ] : [],
						`${testCase.file}.svg`,
					],
				),
			),
		)
	);
}