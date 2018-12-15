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