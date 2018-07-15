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
			item
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
			itemOrLevelOrStack
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
			dependsUpon
		) {
			return (
				resolveWhenString()
				||
				resolveMultiple()
			);

			function resolveWhenString() {
				return (
					typeof dependsUpon === "string"
					&&
					(resolveWhenPath() || dependsUpon)
				);
			}

			function resolveWhenPath() {
				return (
					dependsUpon.startsWith(".")
					&&
					path.join(directory, dependsUpon)
				);
			}

			function resolveMultiple() {
				return dependsUpon.map(resolveDependsUpon);
			}
		}
	};