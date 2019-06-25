/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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