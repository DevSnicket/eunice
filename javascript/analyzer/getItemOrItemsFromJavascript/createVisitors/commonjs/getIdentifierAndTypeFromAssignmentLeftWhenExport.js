/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import isModuleExport from "./isModuleExport";
import isModuleExportProperty from "./isModuleExportProperty";

export default
assignmentExpressionLeft => {
	return (
		getWhenIdentifier()
		||
		getIdentifierWhenMember()
	);

	function getWhenIdentifier() {
		return (
			assignmentExpressionLeft.type === "Identifier"
			&&
			assignmentExpressionLeft.name === "exports"
			&&
			getIdentifierWithType(null)
		);
	}

	function getIdentifierWhenMember() {
		return (
			assignmentExpressionLeft.type === "MemberExpression"
			&&
			getWhenExport()
		);

		function getWhenExport() {
			return (
				whenModuleExport()
				||
				whenExportProperty(assignmentExpressionLeft)
			);

			function whenModuleExport() {
				return (
					whenDirect()
					||
					whenModuleExportProperty(assignmentExpressionLeft)
				);

				function whenDirect() {
					return (
						isModuleExport(assignmentExpressionLeft)
						&&
						getIdentifierWithType(null)
					);
				}
			}
		}
	}
};

function whenExportProperty({
	object,
	property,
}) {
	return (
		object.name === "exports"
		&&
		getIdentifierWithType(property.name)
	);
}

function whenModuleExportProperty({
	object,
	property,
}) {
	return (
		isModuleExportProperty(object)
		&&
		getIdentifierWithType(property.name)
	);
}

function getIdentifierWithType(
	identifier,
) {
	return (
		{
			identifier,
			type: "export",
		}
	);
}