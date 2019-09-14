// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getOrPromptForLicenseAcceptance = require("."),
	path = require("path");


const
	commercialUseText = "For commercial use beyond the evaluation period (as defined in the license) visit the web page above.",
	distSubdirectoryPath = path.join("packagePath", "dist"),
	licenseText = `the license from http://www.devsnicket.com/eunice/licensing or ${path.join("packagePath", "LICENSE")}.`,
	version = "version";

test(
	"Color supported logs second line with escape characters.",
	async() => {
		const log = jest.fn();

		await getOrPromptForLicenseAcceptance({
			distSubdirectoryPath,
			isColorSupported: true,
			log,
			processArguments: {},
			standardInputStream: {},
			version,
		});

		const [ , secondLogArguments ] = log.mock.calls;

		expect(
			secondLogArguments,
		)
		.toEqual(
			// cSpell:disable-next-line
			[ "\x1b[31me\x1b[39m\x1b[32muni\x1b[39m\x1b[31mce\x1b[39m\x1b[1m version\x1b[22m" ],
		);
	},
);

test(
	"Accepted in process arguments logs confirmation and returns true.",
	async() => {
		const log = jest.fn();

		const isAccepted =
			await getOrPromptForLicenseAcceptance({
				distSubdirectoryPath,
				isColorSupported: false,
				log,
				processArguments: { "accept-license": true },
				standardInputStream: {},
				version,
			});

		expect({
			isAccepted,
			logCallsArguments: log.mock.calls,
		})
		.toEqual({
			isAccepted:
				true,
			logCallsArguments:
				[
					[],
					[ "eunice version" ],
					[],
					[ `By specifying the --accept-license argument you have accepted ${licenseText}` ],
					[ commercialUseText ],
				],
		});
	},
);

test(
	"Standard input stream, not of text terminal, logs instructions and returns false.",
	async() => {
		const log = jest.fn();

		const isAccepted =
			await getOrPromptForLicenseAcceptance({
				distSubdirectoryPath,
				isColorSupported: false,
				log,
				processArguments: {},
				standardInputStream: {},
				version,
			});

		expect({
			isAccepted,
			logCallsArguments: log.mock.calls,
		})
		.toEqual({
			isAccepted:
				false,
			logCallsArguments:
				[
					[],
					[ "eunice version" ],
					[],
					[ `To use this program you must accept ${licenseText}` ],
					[ commercialUseText ],
					[],
					[ "To accept run again with the --accept-license argument." ],
				],
		});
	},
);

test(
	"Standard input stream, of text terminal, calls setRawMode once, logs prompt and with keypress name of A returns true.",
	async() => {
		const
			log = jest.fn(),
			on = jest.fn(onCallback),
			setRawMode = jest.fn();

		await getOrPromptForLicenseAcceptance({
			distSubdirectoryPath,
			isColorSupported: false,
			log,
			processArguments: {},
			standardInputStream:
				{
					isTTY: true,
					listenerCount: () => 0,
					on,
					setRawMode,
				},
			version,
		});

		expect({
			logCallsArguments:
				log.mock.calls,
			setRawModeCallCount:
				setRawMode.mock.calls.length,
		})
		.toEqual({
			logCallsArguments:
				[
					[],
					[ "eunice version" ],
					[],
					[ `To use this program you must accept ${licenseText}` ],
					[ commercialUseText ],
					[],
					[ "To accept, press the A key or run again with the --accept-license argument. Any other key will exit without accepting the license." ],
				],
			setRawModeCallCount:
				1,
		});

		function onCallback(
			event,
			callback,
		) {
			return (
				event === "keypress"
				&&
				callback(null, { name: "a" })
			);
		}
	},
);