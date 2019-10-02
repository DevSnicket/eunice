// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		assignmentExpressionLeft,
		defaultIdentifier,
	}) => {
		const identifier =
			getWhenIdentifier()
			||
			getIdentifierWhenMember();

		return (
			identifier
			&&
			{
				identifier,
				type: "export",
			}
		);

		function getWhenIdentifier() {
			return (
				assignmentExpressionLeft.type === "Identifier"
				&&
				assignmentExpressionLeft.name === "exports"
				&&
				assignmentExpressionLeft.name
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
							defaultIdentifier
							&&
							(defaultIdentifier.name || defaultIdentifier)
						);
					}
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