// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const getItemOrCreateItemForGroup = require("./getItemOrCreateItemForGroup");

module.exports = getItemOrCreateItemForGroupAndParents;

function getItemOrCreateItemForGroupAndParents(
	group,
) {
	return (
		group.parent
		?
		getItemOrCreateItemForGroupAndParents({
			...group.parent,
			lastItemOfGroup: { item: getItemOrCreateItemForGroup(group) },
		})
		:
		getItemOrCreateItemForGroup(group)
	);
}