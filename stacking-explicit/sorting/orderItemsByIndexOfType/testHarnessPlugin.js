// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	orderItemsByType = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

processorPlugins.plugIn({
	action:
		orderItemsByType,
	parameter:
		{
			isMultiple: true,
			name: "typesInOrder",
		},
	text:
		"order items by type",
});