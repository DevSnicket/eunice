/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	fs = require("fs"),
	getAncestorIdentifiersWhenValid = require("./getAncestorIdentifiersWhenValid"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path");

module.exports =
	({
		ancestors,
		directory,
		subsetIdentifierHierarchy,
	}) => {
		const ancestorIdentifiers =
			getAncestorIdentifiersWhenValid({
				ancestors,
				subsetIdentifierHierarchy,
			});

		return (
			ancestorIdentifiers
			&&
			getIdentifiersInNewStackFromPath(
				getStackFilePath(),
			)
		);

		function getStackFilePath() {
			return (
				path.join(
					directory,
					...ancestorIdentifiers,
					".devsnicket-eunice-stack.yaml",
				)
			);
		}
	};

function getIdentifiersInNewStackFromPath(
	stackFilePath,
) {
	return (
		fs.existsSync(stackFilePath)
		&&
		readStack()
	);

	function readStack() {
		return (
			parseYaml(
				fs.readFileSync(
					stackFilePath,
					"utf-8",
				),
			)
		);
	}
}