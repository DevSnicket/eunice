/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import createHashFromLocation from ".";

describe(
	"getValueOfKey when hash",
	() => {
		test(
			"undefined returns null",
			() =>
				expect(
					createHashFromLocation({})
					.getValueOfKey("key"),
				)
				.toBeNull(),
		);

		test(
			"without hash symbol prefix throws error",
			() =>
				expect(
					() =>
						createHashFromLocation(
							{ hash: "hash without hash symbol prefix" },
						)
						.getValueOfKey(
							"key",
						),
				)
				.toThrowError("Location hash must start with a hash character."),
		);

		test(
			"has no keys/values returns null",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#" },
					)
					.getValueOfKey(
						"key",
					),
				)
				.toBeNull(),
		);

		test(
			"has key/value returns value",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key=value" },
					)
					.getValueOfKey(
						"key",
					),
				)
				.toEqual(
					"value",
				),
		);
	},
);

test(
	"getValuesOfKeys for two properties/keys when hash has keys/values returns properties/values",
	() =>
		expect(
			createHashFromLocation(
				{ hash: "#key1=value1&key2=value2" },
			)
			.getValuesOfKeys({
				property1: "key1",
				property2: "key2",
			}),
		)
		.toEqual({
			property1: "value1",
			property2: "value2",
		}),
);

describe(
	"getWithKeyAndValue",
	() => {
		test(
			"with key/value when hash undefined returns hash with key/value",
			() =>
				expect(
					createHashFromLocation(
						{},
					)
					.getWithKeyAndValue({
						key: "key",
						value: "value",
					}),
				)
				.toEqual(
					"#key=value",
				),
		);

		test(
			"with key/value when hash contains same key with an old value returns hash with new key/value",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key=old-value" },
					)
					.getWithKeyAndValue({
						key: "key",
						value: "new-value",
					}),
				)
				.toEqual(
					"#key=new-value",
				),
		);

		test(
			"with key/value when hash contains a different key/value returns hash with different and new key/value",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key1=value1" },
					)
					.getWithKeyAndValue({
						key: "key2",
						value: "value2",
					}),
				)
				.toEqual(
					"#key1=value1&key2=value2",
				),
		);

		test(
			"with key and null value when hash contains same key with an old value returns empty hash",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key=value" },
					)
					.getWithKeyAndValue({
						key: "key",
						value: null,
					}),
				)
				.toEqual(
					"#",
				),
		);
	},
);

describe(
	"getWithKeysAndValues",
	() => {
		test(
			"with two keys/values when hash undefined returns hash with keys/values",
			() =>
				expect(
					createHashFromLocation(
						{},
					)
					.getWithKeysAndValues({
						keys:
							{
								property1: "key1",
								property2: "key2",
							},
						values:
							{
								property1: "value1",
								property2: "value2",
							},
					}),
				)
				.toEqual(
					"#key1=value1&key2=value2",
				),
		);

		test(
			"with key and no value when hash contains key and previous value returns empty hash",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key1=value1" },
					)
					.getWithKeysAndValues({
						keys: { property1: "key1" },
						values: {},
					}),
				)
				.toEqual(
					"#",
				),
		);
	},
);

describe(
	"getWithoutKeys",
	() => {
		test(
			"when hash contains key/value returns empty hash",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key=value" },
					)
					.getWithoutKeys(
						{ property: "key" },
					),
				)
				.toEqual(
					"#",
				),
		);

		test(
			"when hash contains key/value and another key/value returns hash with other key/value",
			() =>
				expect(
					createHashFromLocation(
						{ hash: "#key1=value1&key2=value2" },
					)
					.getWithoutKeys(
						{ property: "key1" },
					),
				)
				.toEqual(
					"#key2=value2",
				),
		);
	},
);


test(
	"setKeyAndValue sets hash with key/value",
	() => {
		const hashSetter = jest.fn();

		createHashFromLocation(
			{
				set hash(hash) {
					hashSetter(hash);
				},
			},
		)
		.setKeyAndValue({
			key: "key",
			value: "value",
		});

		expect(
			hashSetter.mock.calls,
		)
		.toEqual(
			[ [ "#key=value" ] ],
		);
	},
);

test(
	"setKeysAndValues sets hash with keys/values",
	() => {
		const hashSetter = jest.fn();

		createHashFromLocation(
			{
				set hash(hash) {
					hashSetter(hash);
				},
			},
		)
		.setKeysAndValues({
			keys:
				{
					property1: "key1",
					property2: "key2",
				},
			values:
				{
					property1: "value1",
					property2: "value2",
				},
		});

		expect(
			hashSetter.mock.calls,
		)
		.toEqual(
			[ [ "#key1=value1&key2=value2" ] ],
		);
	},
);