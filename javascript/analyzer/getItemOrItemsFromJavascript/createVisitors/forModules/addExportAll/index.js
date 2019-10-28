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
		addWhenAnyDependsUponItems(
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

	function addWhenAnyDependsUponItems(
		items,
	) {
		if (items.length)
			addDeclarationsIn({
				declarations:
					[ {
						dependsUpon:
							{
								id: modulePath.withoutExtension,
								items: getItemWhenSingular() || items,
							},
						type:
							"export",
					} ],
				parent:
					null,
			});

		function getItemWhenSingular() {
			return items.length === 1 && items[0];
		}
	}
}