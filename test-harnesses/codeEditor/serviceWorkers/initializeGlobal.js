const
	formatPackageUrl = require("./formatPackageUrl"),
	workers = require("./workers.json");

module.exports =
	() => {
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