// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDeclarationsWhenCallOfRequire = require("./createDeclarationsWhenCallOfRequire"),
	getIdentifierAndTypeFromAssignmentLeftWhenExport = require("./getIdentifierAndTypeFromAssignmentLeftWhenExport"),
	hasTypeOfFunction = require("../hasTypeOfFunction");

module.exports =
	({
		addDeclarationsIn,
		assignmentExpression: { left, right },
		removeExtensionFromFilePath,
	}) =>
		!hasTypeOfFunction(right)
		&&
		addDeclarationsIn({
			declarations:
				createDeclarationsWithExportIdentifierAndType({
					identifierAndType:
						getIdentifierAndTypeFromAssignmentLeftWhenExport(left),
					removeExtensionFromFilePath,
					right,
				}),
			parent:
				null,
		});

function createDeclarationsWithExportIdentifierAndType({
	identifierAndType,
	removeExtensionFromFilePath,
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
				getIsDestructuredAndVariables,
				removeExtensionFromFilePath,
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