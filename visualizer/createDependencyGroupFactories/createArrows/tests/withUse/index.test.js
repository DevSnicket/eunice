// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import createArrows from "../..";
import { createElement } from "react";
import createSvgElement from "../createSvgElement";
import createSymbolAndUseElementsAndGetSize from "./createSymbolAndUseElementsAndGetSize";
import formatSvg from "../../../../formatSvg";
import path from "path";
import readTestCaseFile from "../readTestCaseFile";
import { renderToStaticMarkup } from "react-dom/server";
import withPrecision from "../../../../withPrecision";

const testCases =
	[
		// eslint-disable-next-line no-undefined
		[ { directory: "." } ],
		[ {
			colors: {
				green: "#00A000",
				red: "#C00000",
			},
			directory:
				"dark",
		} ],
	];

const
	horizontal = {
		dimension: {
			auto: "y",
			grow: "x",
		},
		size: {
			auto: "height",
			grow: "width",
		},
	},
	vertical = {
		dimension: {
			auto: "x",
			grow: "y",
		},
		size: {
			auto: "width",
			grow: "height",
		},
	};

test.each(testCases)(
	"colors %j, default height and width of 24",
	({ colors, directory }) => {
		expectRenderedToBe({
			directory,
			file: "default-height",
			...createSymbolAndUseElementsAndGetSize({
				arrowSize: {
					height: null,
					width: 24,
				},
				arrows:
					createArrows({
						colors,
						createElement,
						withPrecision,
					}),
				createElement,
				orientation:
					horizontal,
				spacing:
					4,
			}),
		});
	},
);

test.each(
	getWithDescriptionTestCases(),
)(
	"colors %j with descriptions",
	async({
		// @ts-ignore
		colors,
		directory,
		fileNameSuffix,
		orientation,
	}) => {
		const
			arrowSize = {
				height: 120,
				width: 120,
			},
			center =
				60,
			spacing =
				10;

		const
			{ elements, size }
			=
			createSymbolAndUseElementsAndGetSize({
				arrowSize,
				arrows:
					createArrows({
						colors,
						createElement,
						withPrecision,
					}),
				createElement,
				orientation,
				spacing,
			});

		await expectRenderedToBe({
			directory,
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
			file:
				`with-descriptions${fileNameSuffix}`,
			size,
		});

		// dy, x and y are attribute names in SVG
		/* eslint id-length: ["error", { "exceptions": ["dy", "x", "y"] }] */
		function createDescriptionTexts() {
			return (
				[
					[ "matches", "stack" ],
					[ "does not", "match stack" ],
					[ "is not", "independent" ],
				]
				.map(
					(textLines, index) =>
						// @ts-ignore
						createText({
							textLines,
							[orientation.dimension.grow]:
								getOffsetFromIndex(index),
							[orientation.dimension.auto]:
								center,
						}),
				)
			);

			function getOffsetFromIndex(
				index,
			) {
				return (
					center
					+
					(index * (arrowSize[orientation.size.grow] + spacing))
				);
			}

			function createText({
				textLines,
				x,
				y,
			}) {
				return (
					createElement(
						"text",
						{
							dy:
								"-0.35em",
							key:
								textLines.join("\n"),
							y,
						},
						textLines.map(
							(text, index) =>
								createTspan({
									isNotFirst:
										index,
									text,
									x,
								}),
						),
					)
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
							key:
								text,
							// dimension can be either x or y
							// eslint-disable-next-line sort-keys
							x,
						},
						text,
					)
				);
			}
		}
	},
);

function getWithDescriptionTestCases() {
	return (
		testCases
		.flatMap(
			testCase =>
				[
					{
						fileNameSuffix:
							"",
						orientation:
							horizontal,
					},
					{
						fileNameSuffix:
							"-vertical",
						orientation:
							vertical,
					},
				]
				.map(
					orientation => [ {
						...testCase[0],
						...orientation,
					} ],
				),
		)
	);
}

async function expectRenderedToBe({
	directory,
	elements,
	file,
	size,
}) {
	return (
		expect(
			formatSvg(
				renderToStaticMarkup(
					createSvgElement({
						createElement,
						elements,
						size,
					}),
				),
			),
		)
		.toBe(
			await readTestCaseFile(
				path.join(
					__dirname,
					"test-cases",
					directory,
					`${file}.svg`,
				),
			),
		)
	);
}