/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDeclarationsWhenCallOfRequire from "./createDeclarationsWhenCallOfRequire";
import getIdentifierAndTypeFromAssignmentLeftWhenExport from "./getIdentifierAndTypeFromAssignmentLeftWhenExport";
import hasTypeOfFunction from "../hasTypeOfFunction";

export default ({
	addDeclarationsIn,
	assignmentExpression: { left, right },
	createPathBasedDependsUpon,
}) =>
	!hasTypeOfFunction(right)
	&&
	addDeclarationsIn({
		declarations:
			createDeclarationsWithExportIdentifierAndType({
				createPathBasedDependsUpon,
				identifierAndType:
					getIdentifierAndTypeFromAssignmentLeftWhenExport(left),
				right,
			}),
		parent:
			null,
	});

function createDeclarationsWithExportIdentifierAndType({
	createPathBasedDependsUpon,
	identifierAndType,
	right,
}) {
	return (
		(!identifierAndType && [])
		||
		whenCallOfRequire()
		||
		[
			createDeclaration({
				alias: getNameWhenIdentifier(right),
				...identifierAndType,
			}),
		]
	);

	function whenCallOfRequire() {
		return (
			createDeclarationsWhenCallOfRequire({
				callOrMemberOfCallExpression:
					right,
				createPathBasedDependsUpon,
				directoryAbsolutePath:
					null,
				getIsDestructuredAndVariables,
			})
		);

		function getIsDestructuredAndVariables() {
			return { variables: [ createVariable() ] };

			function createVariable() {
				return (
					{
						id: identifierAndType.identifier,
						type: "export",
					}
				);
			}
		}
	}
}

function getNameWhenIdentifier(
	node,
) {
	return (
		node.type === "Identifier"
		&&
		node.name
	);
}

function createDeclaration({
	alias,
	identifier,
	type,
}) {
	return (
		{
			dependsUpon: alias,
			id: identifier,
			isPeerFunctionRequired: true,
			type,
		}
	);
}