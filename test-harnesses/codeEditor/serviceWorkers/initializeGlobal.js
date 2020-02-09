/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import formatPackageUrl from "./formatPackageUrl";
import workers from "./workers.json";

export default () => {
	self.MonacoEnvironment = { getWorkerUrl };

	function getWorkerUrl(
		moduleId,
		label,
	) {
		const worker = findWorkerWithLabel(label);

		if (worker)
			return formatPackageUrl(`${worker.pathWithoutExtension}.js`);
		else
			throw Error(`Monaco editor label of "${label}" is not supported.`);
	}

	function findWorkerWithLabel(
		label,
	) {
		return workers.find(worker => label === worker.label);
	}
};