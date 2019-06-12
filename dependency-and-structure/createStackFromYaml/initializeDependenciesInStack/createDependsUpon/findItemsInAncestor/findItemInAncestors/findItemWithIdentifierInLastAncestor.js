module.exports =
	({
		ancestors,
		identifier,
	}) => {
		const lastAncestor = ancestors[0];

		return (
			lastAncestor.items
			&&
			lastAncestor.items
			.flat()
			.find(item => item.id === identifier)
		);
	};