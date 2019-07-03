/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

const
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad;

module.exports =
	files =>
		files.reduce(
			(stack, file) =>
				[
					...stack,
					...ensureInLevel(readYamlFile(file)),
				],
			[],
		);

function ensureInLevel(
	yaml,
) {
	return (
		Array.isArray(yaml)
		?
		yaml
		:
		[ yaml ]
	);
}

function readYamlFile(
	file,
) {
	return (
		parseYaml(
			fs.readFileSync(
				file,
				"utf-8",
			),
		)
	);
}