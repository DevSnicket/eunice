// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const orderItemsByIndexOf = require("../orderItemsByIndex");

module.exports =
	({
		items,
		typesInOrder,
	}) =>
		orderItemsByIndexOf({
			getItemIndex: item => typesInOrder.indexOf(item.type),
			items,
		});