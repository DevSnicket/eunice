/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		dependsUpon,
		identifier,
		replaceDependsUponItems,
	}) => {
		return (
			dependsUpon
			&&
			(whenArray() || replaceDependUpon(dependsUpon))
		);

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.flatMap(replaceDependUpon)
			);
		}

		function replaceDependUpon(
			dependUpon,
		) {
			return whenHasScope() || dependUpon;

			function whenHasScope() {
				return (
					dependUpon.id === identifier
					&&
					replaceDependsUponItems(dependUpon.items)
				);
			}
		}
	};