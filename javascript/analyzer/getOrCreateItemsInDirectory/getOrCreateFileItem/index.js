// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDependsUponFileResolverForDirectory = require("./createDependsUponFileResolverForDirectory"),
	path = require("path");

module.exports =
	({
		directory,
		filePath,
		itemOrItems,
	}) => {
		const identifier =
			path.join(directory, filePath.dir, filePath.name);

		const dependsUponFileResolver =
			createDependsUponFileResolverForDirectory(
				directory,
			);

		return (
			(!itemOrItems && identifier)
			||
			whenArray()
			||
			withIdentifier()
		);

		function whenArray() {
			return (
				Array.isArray(itemOrItems)
				&&
				(getOrCreateWhenItem() || createWithItems())
			);

			function getOrCreateWhenItem() {
				return (
					itemOrItems.length === 1
					&&
					{
						id:
							identifier,
						items:
							dependsUponFileResolver.resolveInItem(
								itemOrItems[0],
							),
					}
				);
			}

			function createWithItems() {
				return (
					{
						id:
							identifier,
						items:
							dependsUponFileResolver.resolveInItemOrLevelOrStack(
								itemOrItems,
							),
					}
				);
			}
		}

		function withIdentifier() {
			return (
				{
					id: identifier,
					...getDependsUponProperty(),
					...getItemsProperty(),
				}
			);

			function getDependsUponProperty() {
				return (
					itemOrItems.dependsUpon
					&&
					{ dependsUpon: getDependsUpon() }
				);

				function getDependsUpon() {
					return (
						dependsUponFileResolver.resolve(
							itemOrItems.dependsUpon,
						)
					);
				}
			}

			function getItemsProperty() {
				return (
					itemOrItems.items
					&&
					{ items: getItems() }
				);

				function getItems() {
					return (
						dependsUponFileResolver.resolveInItemOrLevelOrStack(
							itemOrItems.items,
						)
					);
				}
			}
		}
	};