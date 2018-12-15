const orderItemsByIndexOf = require("../orderItemsByIndex");

module.exports =
	({
		items,
		identifierSuffixesInOrder,
	}) => {
		return (
			orderItemsByIndexOf({
				getItemIndex:
					item =>
						getWhenIndexOrDefault(
							getItemIndex(item),
						),
				items,
			})
		);

		function getItemIndex(
			item,
		) {
			return (
				item.id
				?
				identifierSuffixesInOrder.findIndex(
					suffix => item.id.endsWith(suffix),
				)
				:
				-1
			);
		}

		function getWhenIndexOrDefault(
			index,
		) {
			return (
				index === -1
				?
				identifierSuffixesInOrder.length
				:
				index
			);
		}
	};