// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getIdentifierFromAssignmentExpressionLeft from "../../getIdentifierFromAssignmentExpressionLeft";

export default
({ parent: { left, type } }) =>
	createFromIdentifier(
		type === "AssignmentExpression"
		&&
		getIdentifierFromAssignmentExpressionLeft(left),
	);

function createFromIdentifier(
	identifier,
) {
	return (
		identifier
		&&
		{ identifier }
	);
}