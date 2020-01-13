/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createResizableContainer = require(".."),
	{ createElement } = require("react"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTextFile = require("./readTextFile"),
	removeWhitespaceFromTestExpected = require("./removeWhitespaceFromTestExpected");

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