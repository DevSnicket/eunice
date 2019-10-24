// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
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
		object.type === "MemberExpression"
		&&
		isModuleExport(object)
		&&
		getIdentifierWithType(property.name)
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