// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import copyServiceWorkerDirectory from "./copyServiceWorkerDirectory";
import writeHtmlWithYaml from "./writeHtmlWithYaml";

export default
async({
	directoryPath,
	htmlFileName,
	includeServiceWorkers,
	isInferStacksEnabled,
	sourceDirectoryPath,
	yaml,
}) => {
	await writeHtmlWithYaml({
		directoryPath,
		htmlFileName,
		isInferStacksEnabled,
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