/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		assignmentExpressionLeft,
		defaultIdentifier,
	}) => {
		return (
			assignmentExpressionLeft.type === "MemberExpression"
			&&
			whenCommonjsExport()
		);

		function whenCommonjsExport() {
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
						defaultIdentifier
						&&
						defaultIdentifier.name
					);
				}
			}
		}
	};

function whenModuleExportProperty({
	object,
	property,
}) {
	return (
		object.type === "MemberExpression"
		&&
		isModuleExport(object)
		&&
		property.name
	);
}

function isModuleExport({
	object,
	property,
}) {
	return (
		object.name === "module"
		&&
		property.name === "exports"
	);
}

function whenExportProperty({
	object,
	property,
}) {
	return (
		object.name === "exports"
		&&
		property.name
	);
}