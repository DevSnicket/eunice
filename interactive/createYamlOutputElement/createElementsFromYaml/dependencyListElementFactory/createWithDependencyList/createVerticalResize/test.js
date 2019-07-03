/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createVerticalResize = require("."),
	{ createElement } = require("react"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTextFile = require("../../../../../readTextFile"),
	removeWhitespaceFromTestExpected = require("../removeWhitespaceFromTestExpected");

test(
	"creates and includes elements",
	async() =>
		expect(
			renderToStaticMarkup(
				createVerticalResize({
					createElement,
					elements:
						{
							lower: "lower",
							upper: "upper",
						},
					resizableElementTypes:
						{
							container: "container",
							element: "element",
							splitter: "splitter",
						},
				}),
			),
		)
		.toEqual(
			removeWhitespaceFromTestExpected(
				await readTextFile(
					path.join(__dirname, "testCase.html"),
				),
			),
		),
);