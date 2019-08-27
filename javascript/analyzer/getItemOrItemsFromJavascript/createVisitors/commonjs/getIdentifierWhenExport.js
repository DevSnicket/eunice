// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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