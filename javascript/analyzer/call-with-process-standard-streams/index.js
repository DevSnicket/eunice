/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import minimist from "minimist";

export default ({
	action,
	standardInputParameter = null,
}) => {
	const processArguments = minimist(process.argv.slice(2));

	if (standardInputParameter && !processArguments[standardInputParameter])
		callWithProcessArgumentsAndStandardInputStream();
	else
		call(processArguments);

	function callWithProcessArgumentsAndStandardInputStream() {
		const standardIn = process.stdin;

		standardIn.resume();
		standardIn.setEncoding("utf8");

		let input = "";

		standardIn.on(
			"data",
			chunk => input += chunk,
		);

		standardIn.on(
			"end",
			() =>
				call({
					...processArguments,
					[standardInputParameter]: input,
				}),
		);
	}

	function call(
		processArgumentsAndOrStandardInput,
	) {
		Promise.resolve(
			action(processArgumentsAndOrStandardInput),
		)
		.then(
			// eslint-disable-next-line no-console
			console.log,
		);
	}
};