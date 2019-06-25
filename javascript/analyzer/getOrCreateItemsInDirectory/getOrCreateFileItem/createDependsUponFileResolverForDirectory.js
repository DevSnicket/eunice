/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
				typeof item === "string"
				?
				item
				:
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
				resolveInItem(itemOrLevelOrStack)
			);
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