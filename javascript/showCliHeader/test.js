// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path"),
	showCliHeader = require(".");

test(
	"Bright supported logs all lines.",
	() => {
		const log = jest.fn();

		showCliHeader({
			distSubdirectoryPath:
				path.join("packagePath", "dist"),
			isBrightSupported:
				true,
			log,
			version:
				"version",
		});

		expect(log.mock.calls)
		.toEqual(
			[
				[],
				[ "\x1b[1mEunice Community/Trial Edition (version)\x1b[0m" ],
				[],
				[ "By using this program you are agreeing to its license:" ],
				[ `\t${path.join("packagePath", "LICENSE")}` ],
				[ "\thttp://www.devsnicket.com/eunice/licensing/community-trial.txt" ],
			],
		);
	},
);

test(
	"Bright not supported logs second line without escape characters.",
	() => {
		const log = jest.fn();

		showCliHeader({
			distSubdirectoryPath: "",
			isBrightSupported: false,
			log,
			version: "",
		});

		const [ , secondCallArguments ] = log.mock.calls;

		expect(secondCallArguments)
		.toEqual([ "Eunice Community/Trial Edition ()" ]);
	},
);