// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	({
		directoryPath,
		filePath,
		itemOrItems,
	}) => {
		const identifier =
			path.join(directoryPath, filePath.dir, filePath.name);

		return (
			whenNoItemOrItems()
			||
			whenArray()
			||
			withIdentifier()
		);

		function whenNoItemOrItems() {
			return (
				!itemOrItems
				&&
				identifier
			);
		}

		function whenArray() {
			return (
				Array.isArray(itemOrItems)
				&&
				(whenSingle() || withItems())
			);

			function whenSingle() {
				return (
					itemOrItems.length === 1
					&&
					{
						id: identifier,
						items: itemOrItems[0],
					}
				);
			}

			function withItems() {
				return (
					{
						id: identifier,
						items: itemOrItems,
					}
				);
			}
		}

		function withIdentifier() {
			return (
				{
					id: identifier,
					...itemOrItems,
				}
			);
		}
	};