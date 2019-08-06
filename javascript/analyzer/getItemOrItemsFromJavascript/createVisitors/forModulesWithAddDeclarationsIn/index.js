/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDeclarationsFromExport = require("./createDeclarationsFromExport"),
	createDeclarationsFromImport = require("./createDeclarationsFromImport"),
	{ findIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	removeJsFilePathExtension = require("../removeJsFilePathExtension");

module.exports =
	addDeclarationsIn => {
		return (
			{
				ExportAllDeclaration:
					visitExportAllDeclaration,
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
							removeJsFilePathExtension(value),
						type:
							"export",
					} ],
				parent:
					findIdentifiableParent(ancestors),
			});
		}

		function visitExportNamedDeclaration(
			{ source, specifiers },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					createDeclarationsFromExport({
						source,
						specifiers,
					}),
				parent:
					findIdentifiableParent(
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
							removeJsFilePathExtension(
								source.value,
							),
						specifiers,
					}),
				parent:
					findIdentifiableParent(
						ancestors,
					),
			});
		}
	};