/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		arrows,
		countWithDirection,
		createDependencyGroupFactoryWhenRequired,
	}) =>
		[
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.down,
				count: countWithDirection.below,
				keySuffix: "below",
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.up,
				count: countWithDirection.above,
				keySuffix: "above",
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.right,
				count: countWithDirection.same,
				keySuffix: "same",
			}),
		]
		.filter(groupFactory => groupFactory);