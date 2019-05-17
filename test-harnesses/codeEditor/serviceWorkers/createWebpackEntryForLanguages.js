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