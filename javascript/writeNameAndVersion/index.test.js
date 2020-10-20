// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import writeNameAndVersion from ".";

test.each(
	[
		[
			false,
			"without",
			"eunice",
		],
		[
			true,
			"with",
			// cSpell:disable-next-line
			"\x1b[31me\x1b[39m\x1b[32muni\x1b[39m\x1b[31mce\x1b[39m",
		],
	],
)(
	"Is color supported %s logs %s escape characters.",
	async(isColorSupported, withOrWithoutEscapeCharacters, name) => {
		const
			log = jest.fn(),
			version = "version";

		await writeNameAndVersion({
			isColorSupported,
			log,
			version,
		});

		expect(
			log.mock.calls,
		)
		.toEqual(
			[
				[],
				[ `${name} for JavaScript version` ],
				[],
			],
		);
	},
);