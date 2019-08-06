/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const path = require("path");

module.exports =
	(
		left,
		right,
	) => {
		const
			leftIdentifier = getIdentifier(left),
			rightIdentifier = getIdentifier(right);

		return (
			leftIdentifier !== rightIdentifier
			&&
			(leftIdentifier < rightIdentifier ? -1 : 1)
		);
	};

function getIdentifier(
	item,
) {
	return (
		(item.id || item)
		.replace(
			new RegExp(getPathSeparatorEscaped(), "g"),
			String.fromCharCode(0),
		)
	);

	function getPathSeparatorEscaped() {
		return path.sep.replace("\\", "\\\\");
	}
}