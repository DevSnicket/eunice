// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDeclarationsFromExport = require("./createDeclarationsFromExport"),
	createDeclarationsFromImport = require("./createDeclarationsFromImport"),
	hasTypeOfFunction = require("../hasTypeOfFunction"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors");

module.exports =
	({
		addDeclarationsIn,
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
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					[ {
						dependsUpon:
							removeExtensionFromFilePath(value),
						type:
							"export",
					} ],
				parent:
					findBlockOrIdentifiableParent(ancestors),
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

		function visitExportNamedDeclaration(
			{ source, specifiers },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					createDeclarationsFromExport({
						removeExtensionFromFilePath,
						source,
						specifiers,
					}),
				parent:
					findBlockOrIdentifiableParent(
						ancestors,
					),
			});
		}

		function visitImportDeclaration(
			{ source, specifiers },
			ancestors,
		) {
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
					findBlockOrIdentifiableParent(
						ancestors,
					),
			});
		}
	};