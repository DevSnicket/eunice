/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const getLevelOrStackForTargetIdentifier = require(".");

test(
	"Target identifier of \"existing\" returns getExisting.",
	() => {
		const existing = {};

		expect(
			getLevelOrStackForTargetIdentifier({
				addNewInTarget: null,
				getExisting: () => existing,
				getItemWithIdentifier: null,
				targetIdentifier: "existing",
			}),
		)
		.toBe(
			existing,
		);
	},
);

test(
	"Target identifier of \"existing\", when getExisting returns null, returns empty array.",
	() =>
		expect(
			getLevelOrStackForTargetIdentifier({
				addNewInTarget: null,
				getExisting: () => null,
				getItemWithIdentifier: null,
				targetIdentifier: "existing",
			}),
		)
		.toEqual(
			[],
		),
);

test(
	"Target identifier of \"item\" calls getItemWithIdentifier with identifier.",
	() => {
		let actualIdentifier = null;

		getLevelOrStackForTargetIdentifier({
			addNewInTarget: null,
			getExisting: null,
			getItemWithIdentifier,
			targetIdentifier: "item",
		});

		expect(actualIdentifier)
		.toBe("item");

		function getItemWithIdentifier(
			identifier,
		) {
			actualIdentifier = identifier;
		}
	},
);

test(
	"Target identifier of \"item\" returns result of getItemWithIdentifier.",
	() => {
		const item = {};

		expect(
			getLevelOrStackForTargetIdentifier({
				addNewInTarget: null,
				getExisting: null,
				getItemWithIdentifier: () => item,
				targetIdentifier: "item",
			}),
		)
		.toBe(
			item,
		);
	},
);

test(
	"Target identifier of \"item\" and not addNewInTarget, when getItemWithIdentifier returns empty array.",
	() =>
		expect(
			getLevelOrStackForTargetIdentifier({
				addNewInTarget: false,
				getExisting: null,
				getItemWithIdentifier: () => null,
				targetIdentifier: "item",
			}),
		)
		.toEqual(
			[],
		),
);
test(
	"Target identifier of \"item\" and addNewInTarget, when getItemWithIdentifier returns \"item\".",
	() =>
		expect(
			getLevelOrStackForTargetIdentifier({
				addNewInTarget: true,
				getExisting: null,
				getItemWithIdentifier: () => null,
				targetIdentifier: "item",
			}),
		)
		.toEqual(
			"item",
		),
);