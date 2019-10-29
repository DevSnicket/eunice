// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	fileSystem = require("fs"),
	findNamedExports = require("./findNamedExports"),
	path = require("path");

module.exports =
	({
		addDeclarationsIn,
		directoryAbsolutePath,
		getRelativeWhenFileExists,
		modulePath,
		parseJavascript,
	}) =>
		directoryAbsolutePath
		&&
		addWhenHasNamedExports({
			addDeclarationsIn,
			directoryAbsolutePath,
			modulePath:
				getRelativeWhenFileExists({
					absolute:
						directoryAbsolutePath,
					relative:
						modulePath,
				}),
			parseJavascript,
		});

function addWhenHasNamedExports({
	addDeclarationsIn,
	directoryAbsolutePath,
	modulePath,
	parseJavascript,
}) {
	if (modulePath)
		addWhenAnyNamedExports(
			findNamedExports(
				parseJavascript(
					readModuleFile(),
				)
				.program.body,
			),
		);

	function readModuleFile() {
		return (
			fileSystem.readFileSync(
				path.join(directoryAbsolutePath, modulePath.withExtension),
				"utf-8",
			)
		);
	}

	function addWhenAnyNamedExports(
		namedExports,
	) {
		if (namedExports.length)
			addDeclarationsIn({
				declarations: namedExports.map(createDeclarationFromNamedExport),
				parent: null,
			});

		function createDeclarationFromNamedExport(
			namedExport,
		) {
			return (
				{
					dependsUpon: createDependsUpon(),
					id: namedExport,
					type: "export",
				}
			);

			function createDependsUpon() {
				return (
					{
						id: modulePath.withoutExtension,
						items: namedExport,
					}
				);
			}
		}
	}
}