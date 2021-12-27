// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import fileSystem from "fs";
import findNamedExports from "./findNamedExports";
import path from "path";

export default ({
	addDeclarationsIn,
	createPathBasedDependsUpon,
	directoryAbsolutePath,
	getRelativeWhenFileExists,
	modulePath,
	parseJavascript,
}) =>
	directoryAbsolutePath
	&&
	addWhenHasNamedExports({
		addDeclarationsIn,
		createPathBasedDependsUpon,
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
	createPathBasedDependsUpon,
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
					createPathBasedDependsUpon({
						items: namedExport,
						path: modulePath.withoutExtension,
					})
				);
			}
		}
	}
}