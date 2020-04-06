// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getOrPromptForLicenseAcceptance from ".";
import path from "path";
import { readFile } from "fs-extra";

const
	commercialUseText = "Commercial use (after the evaluation period) requires a subscription, visit the page above for more information.",
	distSubdirectoryPath = __dirname,
	licenseText = "the license http://www.devsnicket.com/eunice/licensing",
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
					[ `By specifying --accept-license you have accepted ${licenseText}` ],
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

describe(
	"Standard input stream of text terminal.",
	() => {
		const
			isColorSupported =
				false,
			// casing must match node
			// eslint-disable-next-line id-match
			isTTY =
				true,
			processArguments =
				{},
			promptLogCalls =
				[
					[],
					[ "eunice version" ],
					[],
					[ `To use this program you must accept ${licenseText}` ],
					[ commercialUseText ],
					[],
					[ "To accept, press the A key or run again with the --accept-license argument." ],
					[ "Press the V key to view the license." ],
					[ "Any other key will exit without accepting the license." ],
				];

		test(
			"Set setRawMode on and off.",
			async() => {
				const setRawMode = jest.fn();

				await getOrPromptForLicenseAcceptance({
					distSubdirectoryPath,
					isColorSupported,
					log: () => null,
					processArguments,
					standardInputStream:
						{
							isTTY,
							listenerCount,
							on: getOnCallbackPressKeyNames(null),
							setRawMode,
						},
					version,
				});

				expect(setRawMode.mock.calls)
				.toEqual([ [ true ], [ false ] ]);
			},
		);

		test(
			"Logs prompt.",
			async() => {
				const log = jest.fn();

				await getOrPromptForLicenseAcceptance({
					distSubdirectoryPath,
					isColorSupported,
					log,
					processArguments,
					standardInputStream:
						{
							isTTY,
							listenerCount,
							on: getOnCallbackPressKeyNames(null),
							setRawMode: () => null,
						},
					version,
				});

				expect(log.mock.calls)
				.toEqual(promptLogCalls);
			},
		);

		test(
			"With key press of \"a\" returns true.",
			async() => {
				expect(
					await getOrPromptForLicenseAcceptance({
						distSubdirectoryPath,
						isColorSupported,
						log: () => null,
						processArguments,
						standardInputStream:
							{
								isTTY,
								listenerCount,
								on: getOnCallbackPressKeyNames("a"),
								setRawMode: () => null,
							},
						version,
					}),
				)
				.toEqual(
					true,
				);
			},
		);

		test(
			"With key press of \"v\" logs license after prompt.",
			async() => {
				const log = jest.fn();

				await getOrPromptForLicenseAcceptance({
					distSubdirectoryPath,
					isColorSupported,
					log,
					processArguments,
					standardInputStream:
						{
							isTTY,
							listenerCount,
							on: getOnCallbackPressKeyNames("v", null),
							setRawMode: () => null,
						},
					version,
				});

				expect(
					log.mock.calls[promptLogCalls.length][0],
				)
				.toEqual(
					await readFile(
						path.join(__dirname, "..", "LICENSE"),
						"utf-8",
					),
				);
			},
		);

		function listenerCount() {
			return 0;
		}

		function getOnCallbackPressKeyNames(
			...names
		) {
			return (
				(
					event,
					callback,
				) =>
					event === "keypress"
					&&
					names.map(name => callback(null, { name }))
			);
		}
	},
);