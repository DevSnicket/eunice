const path = require("path");

module.exports =
	directory => {
		return (
			{
				resolve: resolveDependsUpon,
				resolveInItem,
				resolveInItemOrLevelOrStack,
			}
		);

		function resolveInItem(
			item,
		) {
			return (
				{
					...item,
					...resolveDependsUponProperty(),
					...resolveItemProperty(),
				}
			);

			function resolveDependsUponProperty() {
				return (
					item.dependsUpon
					&&
					{ dependsUpon: resolveDependsUpon(item.dependsUpon) }
				);
			}

			function resolveItemProperty() {
				return (
					item.items
					&&
					{ items: resolveInItemOrLevelOrStack(item.items) }
				);
			}
		}

		function resolveInItemOrLevelOrStack(
			itemOrLevelOrStack,
		) {
			return (
				Array.isArray(itemOrLevelOrStack)
				?
				itemOrLevelOrStack.map(resolveInItemOrLevelOrStack)
				:
				resolvedItemFileDependsUponOfItem()
			);

			function resolvedItemFileDependsUponOfItem() {
				return (
					typeof itemOrLevelOrStack === "string"
					?
					itemOrLevelOrStack
					:
					resolveInItem(itemOrLevelOrStack)
				);
			}
		}

		function resolveDependsUpon(
			dependsUpon,
		) {
			return (
				resolveWhenString()
				||
				resolveWhenArray()
				||
				resolveObject()
			);

			function resolveWhenString() {
				return (
					typeof dependsUpon === "string"
					&&
					(resolveIdentifierWhenPath(dependsUpon) || dependsUpon)
				);
			}

			function resolveWhenArray() {
				return (
					Array.isArray(dependsUpon)
					&&
					dependsUpon.map(resolveDependsUpon)
				);
			}

			function resolveObject() {
				const resolvedIdentifier = resolveIdentifierWhenPath(dependsUpon.id);

				return (
					resolvedIdentifier
					?
					{
						id: resolvedIdentifier,
						items: dependsUpon.items,
					}
					:
					dependsUpon
				);
			}

			function resolveIdentifierWhenPath(
				identifier,
			) {
				return (
					identifier.startsWith(".")
					&&
					path.join(directory, getIdentifierWithTrailingSlashTrimmed())
				);

				function getIdentifierWithTrailingSlashTrimmed(
				) {
					return (
						identifier.endsWith("/")
						?
						identifier.substring(0, identifier.length - 1)
						:
						identifier
					);
				}
			}
		}
	};