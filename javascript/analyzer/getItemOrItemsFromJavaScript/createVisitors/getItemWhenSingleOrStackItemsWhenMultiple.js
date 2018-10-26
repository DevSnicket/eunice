module.exports =
	items =>
		items
		&&
		items.length
		&&
		(items.length === 1 ? items[0] : items.map(item => [ item ]));