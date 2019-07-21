/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		assignmentExpressionLeft,
		functionExpressionIdentifier,
	}) => {
		return (
			assignmentExpressionLeft.type === "MemberExpression"
			&&
			whenModuleExport()
		);

		function whenModuleExport() {
			return (
				fromFunction()
				||
				fromProperty(assignmentExpressionLeft)
			);

			function fromFunction() {
				return (
					isModuleExport(assignmentExpressionLeft)
					&&
					functionExpressionIdentifier
					&&
					functionExpressionIdentifier.name
				);
			}
		}
	};

function fromProperty({
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