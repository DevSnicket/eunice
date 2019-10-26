// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getIdentifierAndTypeFromAssignmentLeftWhenExport = require("./getIdentifierAndTypeFromAssignmentLeftWhenExport");

module.exports =
	parent =>
		parent.type === "AssignmentExpression"
		&&
		getIdentifierAndTypeFromAssignmentLeftWhenExport(
			parent.left,
		);