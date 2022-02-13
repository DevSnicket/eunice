/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { createElement } from "react";
import createResizableContainer from "..";
import path from "path";
import readTextFile from "./readTextFile";
import removeWhitespaceFromTestExpected from "./removeWhitespaceFromTestExpected";
import { renderToStaticMarkup } from "react-dom/server";

const resizableElementTypes =
	{
		container: "container",
		item: "item",
		splitter: "splitter",
	};

test(
	"two horizontal renderers",
	async() =>
		expect(
			renderToStaticMarkup(
				createResizableContainer({
					createElement,
					flexKeysAndValues:
						{},
					items:
						[
							{ element: "upper" },
							{ element: "lower" },
						],
					orientation:
						"horizontal",
					resizableElementTypes,
				}),
			),
		)
		.toEqual(
			await readExpectedWithFileName("horizontal.html"),
		),
);

test(
	"two vertical renderers",
	async() =>
		expect(
			renderToStaticMarkup(
				createResizableContainer({
					createElement,
					flexKeysAndValues:
						{},
					items:
						[
							{ element: "left" },
							{ element: "right" },
						],
					orientation:
						"vertical",
					resizableElementTypes,
				}),
			),
		)
		.toEqual(
			await readExpectedWithFileName("vertical.html"),
		),
);

describe(
	"flex",
	() => {
		test(
			"default renderers",
			async() =>
				expect(
					renderToStaticMarkup(
						createResizableContainer({
							createElement,
							flexKeysAndValues:
								{},
							items:
								[
									{
										element: "item",
										flex: { default: "0.6" },
									},
								],
							orientation:
								"vertical",
							resizableElementTypes,
						}),
					),
				)
				.toEqual(
					await readExpectedWithFileName(path.join("flex", "default.html")),
				),
		);

		describe(
			"key",
			() => {
				test(
					"get value renderers",
					async() =>
						expect(
							renderToStaticMarkup(
								createResizableContainer({
									createElement,
									flexKeysAndValues:
										{
											getValueOfKey:
												key =>
													key === "flex-key"
													&&
													"0.2",
										},
									items:
										[
											{
												element: "item",
												flex: { key: "flex-key" },
											},
										],
									orientation:
										"vertical",
									resizableElementTypes,
								}),
							),
						)
						.toEqual(
							await readExpectedWithFileName(path.join("flex", "key.html")),
						),
				);

				test(
					"set key and value called on stop resize",
					() => {
						const
							flex = "0.8",
							key = "flex-key",
							setKeyAndValue = jest.fn();

						const resizableContainer =
							createResizableContainer({
								createElement,
								flexKeysAndValues:
									{
										getValueOfKey:
											() => null,
										setKeyAndValue,
									},
								items:
									[
										{
											element: "item",
											flex: { key },
										},
									],
								orientation:
									"vertical",
								resizableElementTypes,
							});

						resizableContainer.props.children[0].props.onStopResize(
							{ component: { props: { flex } } },
						);

						expect(
							setKeyAndValue.mock.calls,
						)
						.toEqual(
							[ [ {
								key,
								value: flex,
							} ] ],
						);
					},
				);
			},
		);
	},
);

async function readExpectedWithFileName(
	fileName,
) {
	return (
		removeWhitespaceFromTestExpected(
			await readTextFile(
				path.join(__dirname, "test-cases", fileName),
			),
		)
	);
}