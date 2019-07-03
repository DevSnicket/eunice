/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const removePrefixInDependsUpon = require("./removePrefixInDependsUpon");

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		dependsUpon,
		prefix,
		scope,
	}) =>
		dependsUpon
		&&
		withPrefixAndSuffix({
			prefix,
			scopeIdentifier: `@${scope}`,
		})
		.removePrefixAndScopeInDependsUpon(
			dependsUpon,
		);

function withPrefixAndSuffix({
	prefix,
	scopeIdentifier,
}) {
	return { removePrefixAndScopeInDependsUpon };

	function removePrefixAndScopeInDependsUpon(
		dependsUpon,
	) {
		return whenArray() || removePrefixAndScopeInDependUpon(dependsUpon);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.flatMap(removePrefixAndScopeInDependUpon)
			);
		}
	}

	function removePrefixAndScopeInDependUpon(
		dependUpon,
	) {
		return whenHasScope() || dependUpon;

		function whenHasScope() {
			return (
				dependUpon.id === scopeIdentifier
				&&
				removePrefixInDependsUpon({
					dependsUpon: dependUpon.items,
					prefix,
				})
			);
		}
	}
}