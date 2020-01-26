// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	whenAssignment = require("./whenAssignment"),
	whenBlock = require("./whenBlock"),
	whenMethod = require("./whenMethod"),
	whenVariableDeclarator = require("./whenVariableDeclarator");

module.exports =
	({
		ancestors,
		findBlockOrIdentifiableParentInAncestors,
		functionExpression,
		parent,
	}) =>
		whenAssignment(
			{ parent },
		)
		||
		whenMethod({
			ancestors,
			parent,
		})
		||
		whenVariableDeclarator({
			ancestors,
			findBlockOrIdentifiableParentInAncestors,
			parent,
		})
		||
		whenBlock({
			ancestors,
			findBlockOrIdentifiableParentInAncestors,
			functionExpression,
			parent,
		});