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
		yamlFilePath,
	}) => {
		await writeHtml({
			directoryPath,
			htmlFileName,
			yamlFilePath,
		});

		if (includeServiceWorkers)
			await copyServiceWorkersIntoDirectoryPath(directoryPath);

		if (includeSourceMap)
			await copySourceMapIntoDirectoryPath(directoryPath);
	};