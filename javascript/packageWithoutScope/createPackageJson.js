const
	fs = require("fs"),
	{ promisify } = require("util");

writePackageJson();

async function writePackageJson() {
	await promisify(fs.writeFile)(
		"package.json",
		formatAsJson(
			createFromScopedPackageJson(
				JSON.parse(
					await readScopedPackageJson(),
				),
			),
		),
	);

	function readScopedPackageJson() {
		return promisify(fs.readFile)("../package.json", "utf-8");
	}

	function createFromScopedPackageJson(
		scopedPackageJson,
	) {
		return (
			{
				...scopedPackageJson,
				bin: { eunice: "bin.js" },
				dependencies: { "@devsnicket/eunice": scopedPackageJson.version },
				// undefined used to remove the property
				// eslint-disable-next-line no-undefined
				devDependencies: undefined,
				name: "eunice",
				// undefined used to remove the property
				// eslint-disable-next-line no-undefined
				scripts: undefined,
			}
		);
	}

	function formatAsJson(
		value,
	) {
		return (
			JSON.stringify(
				value,
				null,
				"\t",
			)
		);
	}
}