module.exports =
	({
		id,
		items = null,
		...restOfYamlItem
	}) => (
		{
			id,
			...restOfYamlItem,
			...items && { items },
		}
	);