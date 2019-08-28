// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const getItemOrCreateItemForGroupAndParents = require("./getItemOrCreateItemForGroupAndParents");

module.exports =
	aggregation => {
		return (
			aggregation
			&&
			createFromGroup()
		);

		function createFromGroup() {
			return (
				[
					...aggregation.items || [],
					getItemOrCreateItemForGroupAndParents(aggregation.group),
				]
			);
		}
	};