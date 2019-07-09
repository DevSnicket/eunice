/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const removePrefixInDependsUpon = require(".");

test(
	"DependsUpon and prefix of null returns null.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon: null,
				prefix: null,
			}),
		)
		.toBeNull(),
);

test(
	"DependsUpon of identifier without prefix returns identifier.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon: "dependsUpon",
				prefix: "prefix",
			}),
		)
		.toEqual(
			"dependsUpon",
		),
);

test(
	"DependsUpon of identifier with prefix returns identifier with prefix removed.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon: "prefix-dependsUpon",
				prefix: "prefix-",
			}),
		)
		.toEqual(
			"dependsUpon",
		),
);

test(
	"DependsUpon of item without prefix returns item.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon:
					{
						id: "dependsUpon",
						items: "child",
					},
				prefix:
					"prefix-",
			}),
		)
		.toEqual({
			id: "dependsUpon",
			items: "child",
		}),
);

test(
	"DependsUpon of item with prefix returns item with prefix removed.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon:
					{
						id: "prefix-dependsUpon",
						items: "child",
					},
				prefix:
					"prefix-",
			}),
		)
		.toEqual({
			id: "dependsUpon",
			items: "child",
		}),
);

test(
	"DependsUpon of item without prefix and item with prefix returns.",
	() =>
		expect(
			removePrefixInDependsUpon({
				dependsUpon:
					[
						{
							id: "dependsUpon",
							items: "childOfItemWithoutPrefix",
						},
						{
							id: "prefix-dependsUpon",
							items: "childOfItemWithPrefix",
						},
					],
				prefix:
					"prefix-",
			}),
		)
		.toEqual(
			[
				{
					id: "dependsUpon",
					items: "childOfItemWithoutPrefix",
				},
				{
					id: "dependsUpon",
					items: "childOfItemWithPrefix",
				},
			],
		),
);