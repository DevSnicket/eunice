// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const combineItemsByType = require(".");

test(
	"Single unknown type throws error with name of type.",
	() =>
		expect(
			() =>
				combineItemsByType(
					[ { type: "unknown" } ],
				),
		)
		.toThrowError(
			"Unexpected types of \"unknown\".",
		),
);

test(
	"Multiple unknown types throws error with names of types.",
	() =>
		expect(
			() =>
				combineItemsByType(
					[
						{ type: "unknown1" },
						{ type: "unknown2" },
					],
				),
		)
		.toThrowError(
			"Unexpected types of \"unknown1\", \"unknown2\".",
		),
);