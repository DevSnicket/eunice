// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	whenDefault = require("./whenDefault"),
	whenVariableDeclarator = require("./whenVariableDeclarator");

module.exports =
	({
		ancestors,
		parent,
	}) =>
		whenDefault(
			{ parent },
		)
		||
		whenVariableDeclarator({
			ancestors,
			parent,
		});