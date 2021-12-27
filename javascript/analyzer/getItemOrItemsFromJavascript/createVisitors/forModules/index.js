// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import addExportAll from "./addExportAll";
import createDeclarationsFromExport from "./createDeclarationsFromExport";
import createDeclarationsFromImport from "./createDeclarationsFromImport";
import hasTypeOfFunction from "../hasTypeOfFunction";

export default ({
	addDeclarationsIn,
	createPathBasedDependsUpon,
	directoryAbsolutePath,
	getRelativeWhenFileExists,
	parseJavascript,
}) => {
	return (
		{
			ExportAllDeclaration:
				visitExportAllDeclaration,
			ExportDefaultDeclaration:
				visitExportDefaultDeclaration,
			ExportNamedDeclaration:
				visitExportNamedDeclaration,
			ImportDeclaration:
				visitImportDeclaration,
		}
	);

	function visitExportAllDeclaration(
		{ source: { value } },
	) {
		addExportAll({
			addDeclarationsIn,
			createPathBasedDependsUpon,
			directoryAbsolutePath,
			getRelativeWhenFileExists,
			modulePath: value,
			parseJavascript,
		});
	}

	function visitExportDefaultDeclaration(
		{ declaration },
	) {
		if (!hasTypeOfFunction(declaration))
			addDeclarationsIn({
				declarations: [ createDeclaration() ],
				parent: null,
			});

		function createDeclaration() {
			return (
				whenHasIdentifier()
				||
				{ type: "export" }
			);

			function whenHasIdentifier() {
				return (
					declaration.type === "Identifier"
					&&
					declaration.name
					&&
					{
						dependsUpon: declaration.name,
						isPeerFunctionRequired: true,
						type: "export",
					}
				);
			}
		}
	}

	function visitExportNamedDeclaration({
		source,
		specifiers,
	}) {
		addDeclarationsIn({
			declarations:
				createDeclarationsFromExport({
					createPathBasedDependsUpon,
					source,
					specifiers,
				}),
			parent:
				null,
		});
	}

	function visitImportDeclaration({
		source,
		specifiers,
	}) {
		addDeclarationsIn({
			declarations:
				createDeclarationsFromImport({
					createPathBasedDependsUpon,
					path:
						source.value,
					specifiers,
				}),
			parent:
				null,
		});
	}
};