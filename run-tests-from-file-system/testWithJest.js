/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		getActualAndExpected,
		name,
	}) =>
		test(
			name,
			() => {
				const { actual, expected } = getActualAndExpected();

				expect(actual)
				.toBe(expected);
			},
		);