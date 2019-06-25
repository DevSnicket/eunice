/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	getSvgForYaml = require(".."),
	path = require("path"),
	readTestFile = require("../readTestFile");

module.exports =
	({
		elementContainerFactory,
		expectedSvgDirectoryPath,
		yamlDirectory,
	}) =>
		expect(
			getSvgForYaml({
				elementContainerFactory,
				yaml:
					readTestFile(
						path.join(__dirname, "..", "testCases", yamlDirectory, ".yaml"),
					),
			}),
		)
		.toEqual(
			readTestFile(
				path.join(
					expectedSvgDirectoryPath,
					"expected.svg",
				),
			),
		);