/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	formatPackageUrl = require("./formatPackageUrl"),
	workers = require("./workers.json");

module.exports =
	languages => {
		return (
			Object.assign(
				{},
				...createEntries(),
			)
		);

		function createEntries() {
			return (
				workers
				.filter(
					({ language }) =>
						!language
						||
						languages.includes(language),
				)
				.map(
					({ pathWithoutExtension }) => (
						{ [formatPackageUrl(pathWithoutExtension)]: formatPackageUrl(`esm/vs/${pathWithoutExtension}.js`) }
					),
				)
			);
		}
	};