const orderItemsByIndexOf = require("../");

module.exports =
	({
		items,
		typesInOrder,
	}) =>
		orderItemsByIndexOf({
			getItemIndex: item => typesInOrder.indexOf(item.type),
			items,
		});