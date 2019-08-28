// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	({
		items,
		type,
	}) => {
		return (
			Array.isArray(items)
			?
			items.map(createItem)
			:
			items && createItem(items)
		);

		function createItem(
			item,
		) {
			return (
				typeof item === "string"
				?
				{
					id: item,
					type,
				}
				:
				{
					...item.id && { id: item.id },
					type,
					...item,
				}
			);
		}
	};