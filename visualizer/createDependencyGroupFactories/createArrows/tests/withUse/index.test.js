/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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

test.each(testCases)(
	"colors %j, default height and width of 24",
	({ colors, directory }) =>
		expectRenderedToBe({
			directory,
			file: "default-height",
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
		}),
);

test.each(testCases)(
	"colors %j with descriptions",
	async({ colors, directory }) => {
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
				"with-descriptions",
			size,
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