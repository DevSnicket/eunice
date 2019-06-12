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