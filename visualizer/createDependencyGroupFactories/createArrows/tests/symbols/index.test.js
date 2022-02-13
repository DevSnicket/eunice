/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDownSymbol from "../../createDownSymbol";
import { createElement } from "react";
import createRightSymbol from "../../createRightSymbol";
import createSvgElement from "../createSvgElement";
import createUpSymbol from "../../createUpSymbol";
import formatSvg from "../../../../formatSvg";
import path from "path";
import readTestCaseFile from "../readTestCaseFile";
import { renderToStaticMarkup } from "react-dom/server";
import withPrecision from "../../../../withPrecision";

test(
	"down renders SVG",
	() =>
		assertExpectedFile({
			element:
				createDownSymbol({
					createElement,
					fill: "fuchsia",
					id: "down-arrow",
				}),
			testCase:
				"down",
		}),
);

test.each(
	[ "00", "07", "d0", "ff" ],
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
					fill: "fuchsia",
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
					fill: "fuchsia",
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
		formatSvg(
			renderToStaticMarkup(
				element,
			),
		),
	)
	.toBe(
		await readTestCaseFile(
			path.join(
				__dirname,
				"test-cases",
				`${testCase}.svg`,
			),
		),
	);
}