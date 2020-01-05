// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	copyServiceWorkerDirectory = require("./copyServiceWorkerDirectory"),
	writeHtmlWithYaml = require("./writeHtmlWithYaml");

module.exports =
	async({
		directoryPath,
		htmlFileName,
		includeServiceWorkers,
		sourceDirectoryPath,
		yaml,
	}) => {
		await writeHtmlWithYaml({
			directoryPath,
			htmlFileName,
			templateHtmlDirectoryPath:
				sourceDirectoryPath,
			yaml,
		});

		if (includeServiceWorkers)
			await copyServiceWorkerDirectory({
				from: sourceDirectoryPath,
				to: directoryPath,
			});
	};