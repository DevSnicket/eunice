/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		dependsUpon,
		prefix,
	}) =>
		dependsUpon
		&&
		withPrefix(prefix)
		.removePrefixInDependsUpon(dependsUpon);

function withPrefix(
	prefix,
) {
	return { removePrefixInDependsUpon };

	function removePrefixInDependsUpon(
		dependsUpon,
	) {
		return whenArray() || removePrefixInDependUpon(dependsUpon);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.map(removePrefixInDependUpon)
			);
		}
	}

	function removePrefixInDependUpon(
		dependUpon,
	) {
		return whenString() || inIdentifier();

		function whenString() {
			return (
				typeof dependUpon === "string"
				&&
				removePrefixFromIdentifier(dependUpon)
			);
		}

		function inIdentifier() {
			return (
				{
					id:
						removePrefixFromIdentifier(
							dependUpon.id,
						),
					items:
						dependUpon.items,
				}
			);
		}
	}

	function removePrefixFromIdentifier(
		identifier,
	) {
		return whenStartsWithPrefix() || identifier;

		function whenStartsWithPrefix() {
			return (
				identifier.startsWith(prefix)
				&&
				identifier.substr(prefix.length)
			);
		}
	}
}