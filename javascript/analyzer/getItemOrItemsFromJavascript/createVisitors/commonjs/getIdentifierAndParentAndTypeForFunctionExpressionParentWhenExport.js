// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getIdentifierAndTypeFromAssignmentLeftWhenExport from "./getIdentifierAndTypeFromAssignmentLeftWhenExport";

export default
parent =>
	parent.type === "AssignmentExpression"
	&&
	getIdentifierAndTypeFromAssignmentLeftWhenExport(
		parent.left,
	);