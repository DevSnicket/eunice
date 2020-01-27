// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createLinear = require("./createLinear"),
	createTree = require("./createTree");

module.exports =
	dependsUpon =>
		dependsUpon.length === 1
		?
		createLinear(dependsUpon[0])
		:
		createTree(dependsUpon);