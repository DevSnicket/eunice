/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const fs = require("fs");

module.exports =
	async file =>
		removeBom(
			await fs.readFileSync(
				file,
				"utf-8",
			),
		);

function removeBom(
	text,
) {
	return (
		text.replace(
			/^\uFEFF/,
			"",
		)
	);
}