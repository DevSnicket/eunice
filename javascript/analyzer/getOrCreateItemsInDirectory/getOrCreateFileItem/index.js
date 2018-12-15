const path = require("path");

const createDependsUponFileResolverForDirectory = require("./createDependsUponFileResolverForDirectory");

module.exports =
	({
		directory,
		filePath,
		items,
		name,
	}) => {
		const identifier =
			path.join(directory, filePath.dir, filePath.name);

		const dependsUponFileResolver =
			createDependsUponFileResolverForDirectory(
				directory,
			);

		return (
			(!items && identifier)
			||
			getOrCreateWhenItem()
			||
			createWithItems()
		);

		function getOrCreateWhenItem() {
			return (
				items.length === 1
				&&
				getOrCreateFromItem({
					dependsUponFileResolver,
					identifier,
					item: items[0],
					name,
				})
			);
		}

		function createWithItems() {
			return (
				{
					id: identifier,
					items: items.map(dependsUponFileResolver.resolveInItemOrLevelOrStack),
				}
			);
		}
	};

function getOrCreateFromItem({
	dependsUponFileResolver,
	identifier,
	item,
	name,
}) {
	return (
		(item === name && identifier)
		||
		(isString() && createParentWithIdentifier())
		||
		(isAnonymousOrSameName() && cloneWithIdentifier())
	);

	function isString() {
		return typeof item === "string";
	}

	function createParentWithIdentifier() {
		return (
			{
				id: identifier,
				items: item,
			}
		);
	}

	function isAnonymousOrSameName() {
		return !item.id || item.id === name;
	}

	function cloneWithIdentifier() {
		const clone = { id: identifier };

		for (const key of Object.keys(item))
			if (key !== "id")
				clone[key] = resolveValueOfKey({ key, value: item[key] });

		return clone;

		function resolveValueOfKey({
			key,
			value,
		}) {
			const resolvedValue = resolveWhenItems() || resolveWhenDependsUpon();

			/* istanbul ignore next: error is only thrown when there is gap in the implementation */
			if (resolvedValue)
				return resolvedValue;
			else
				/* istanbul ignore next: error is only thrown when there is gap in the implementation */
				throw Error(`Resolution not defined for item value key/value of ${key}/${value}`);

			function resolveWhenDependsUpon() {
				return (
					key === "dependsUpon"
					&&
					dependsUponFileResolver.resolve(value)
				);
			}

			function resolveWhenItems() {
				return (
					key === "items"
					&&
					dependsUponFileResolver.resolveInItemOrLevelOrStack(value)
				);
			}
		}
	}
}