/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDeclarationsFromExportSpecifiersWithAlias = require("./createDeclarationsFromExportSpecifiersWithAlias"),
	createDeclarationsFromImport = require("./createDeclarationsFromImport"),
	{ findIdentifiableParent } = require("../parentFunctionsFromAncestors");

module.exports =
	addDeclarationsIn => {
		return (
			{
				ExportNamedDeclaration:
					visitExportNamedDeclaration,
				ImportDeclaration:
					visitImportDeclaration,
			}
		);

		function visitExportNamedDeclaration(
			{ specifiers },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					createDeclarationsFromExportSpecifiersWithAlias(
						specifiers,
					),
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
						from: source.value,
						specifiers,
					}),
				parent:
					findIdentifiableParent(
						ancestors,
					),
			});
		}
	};