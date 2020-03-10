// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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