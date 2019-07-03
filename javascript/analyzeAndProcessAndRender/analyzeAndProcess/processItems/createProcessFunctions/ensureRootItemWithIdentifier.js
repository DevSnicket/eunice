/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		identifier,
		items,
	}) => {
		return whenHasIdentifier() || items;

		function whenHasIdentifier() {
			return identifier && createItemWithIdentifier();

			function createItemWithIdentifier() {
				return (
					(isSingleAnonymous() && replaceIdentifier())
					||
					{
						id: identifier,
						items,
					}
				);

				function isSingleAnonymous() {
					return (
						!Array.isArray(items)
						&&
						!items.id
					);
				}

				function replaceIdentifier() {
					return (
						{
							id: identifier,
							...items,
						}
					);
				}
			}
		}
	};