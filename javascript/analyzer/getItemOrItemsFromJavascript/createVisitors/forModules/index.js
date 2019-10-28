// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	addExportAll = require("./addExportAll"),
	createDeclarationsFromExport = require("./createDeclarationsFromExport"),
	createDeclarationsFromImport = require("./createDeclarationsFromImport"),
	hasTypeOfFunction = require("../hasTypeOfFunction");

module.exports =
	({
		addDeclarationsIn,
		directoryAbsolutePath,
		getRelativeWhenFileExists,
		parseJavascript,
		removeExtensionFromFilePath,
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
						removeExtensionFromFilePath,
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
						from:
							removeExtensionFromFilePath(
								source.value,
							),
						specifiers,
					}),
				parent:
					null,
			});
		}
	};