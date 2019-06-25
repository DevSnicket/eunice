/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		arrows,
		countSelector,
		down,
		level,
		up,
	}) => {
		return (
			concatenateWhenEither(
				getDown(),
				getUp(),
			)
		);

		function getDown() {
			return (
				down.dependencies
				&&
				getForDirectionWhenAny({
					arrow:
						arrows.down,
					count:
						countSelector(down.dependencies),
					level,
					relationship:
						down.relationship,
				})
			);
		}

		function getUp() {
			return (
				up.dependencies
				&&
				getForDirectionWhenAny({
					arrow:
						arrows.up,
					count:
						countSelector(up.dependencies),
					level,
					relationship:
						up.relationship,
				})
			);
		}
	};

function getForDirectionWhenAny({
	arrow,
	count,
	level,
	relationship,
}) {
	return (
		count
		&&
		{ arrow, count, level, relationship }
	);
}

function concatenateWhenEither(
	first,
	second,
) {
	return (
		(first || second)
		&&
		[
			...first ? [ first ] : [],
			...second ? [ second ] : [],
		]
	);
}