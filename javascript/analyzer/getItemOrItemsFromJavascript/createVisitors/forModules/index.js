/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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