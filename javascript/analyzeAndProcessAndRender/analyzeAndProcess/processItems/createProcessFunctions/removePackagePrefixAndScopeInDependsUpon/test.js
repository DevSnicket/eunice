// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const removePackagePrefixAndScopeInDependsUpon = require(".");

test(
	"Item, prefix and scope and null returns null.",
	() =>
		expect(
			removePackagePrefixAndScopeInDependsUpon({
				items: null,
				prefix: null,
				scope: null,
			}),
		)
		.toEqual(
			null,
		),
);

test(
	"Prefix and scope of null returns item.",
	() => {
		const items = {};

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				items,
				prefix: null,
				scope: null,
			}),
		)
		.toBe(
			items,
		);
	},
);

test(
	"Scope of null and item with depends upon identifier with prefix returns item with depends upon identifier without prefix.",
	() => {
		const items = "child";

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				items:
					{
						dependsUpon:
							{
								id: "prefix-item",
								items,
							},
					},
				prefix:
					"prefix-",
				scope:
					null,
			}),
		)
		.toEqual({
			dependsUpon:
				{
					id: "item",
					items,
				},
		});
	},
);

test(
	"Item with depends upon of scope and item with depends upon not of scope, both with depends upon child with prefix, returns first item with depends upon child item without prefix and second item.",
	() => {
		const scope = "scope";

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				items:
					[
						{
							dependsUpon:
								{
									id: `@${scope}`,
									items: "prefix-childOfFirst",
								},
							id:
								"firstItem",
						},
						{
							dependsUpon:
								{
									id: "notScope",
									items: "prefix-childOfSecond",
								},
							id:
								"secondItem",
						},
					],
				prefix: "prefix-",
				scope,
			}),
		)
		.toEqual(
			[
				{
					dependsUpon: "childOfFirst",
					id: "firstItem",
				},
				{
					dependsUpon:
						{
							id: "notScope",
							items: "prefix-childOfSecond",
						},
					id:
						"secondItem",
				},
			],
		);
	},
);