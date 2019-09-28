// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	copyServiceWorkersIntoDirectoryPath = require("./copyServiceWorkersIntoDirectoryPath"),
	copySourceMapIntoDirectoryPath = require("./copySourceMapIntoDirectoryPath"),
	writeHtml = require("./writeHtml");

module.exports =
	async({
		directoryPath,
		htmlFileName,
		includeServiceWorkers,
		includeSourceMap,
		yaml,
	}) => {
		await writeHtml({
			directoryPath,
			htmlFileName,
			yaml,
		});

		if (includeServiceWorkers)
			await copyServiceWorkersIntoDirectoryPath(directoryPath);

		if (includeSourceMap)
			await copySourceMapIntoDirectoryPath(directoryPath);
	};