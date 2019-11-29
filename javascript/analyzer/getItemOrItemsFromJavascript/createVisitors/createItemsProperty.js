// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const stackItemsWhenMultiple = require("./stackItemsWhenMultiple");

module.exports =
	items =>
		items
		&&
		{
			items:
				stackItemsWhenMultiple({
					items,
					withSingleInArray: false,
				}),
		};