/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	assertGetSvgForYaml = require("../assertGetSvgForYaml"),
	{ createElement } = require("react"),
	path = require("path");

test(
	"dependency count elements can be created in a container",
	() =>
		assertGetSvgForYaml({
			elementContainerFactory:
				{
					createForDependencyCount:
						({ element, item, level, relationship }) =>
							createElement(
								"containerElement",
								{
									id: item.id,
									level,
									relationship,
								},
								element,
							),
				},
			expectedSvgDirectoryPath:
				__dirname,
			yamlDirectory:
				path.join("stack", "two-of-two-items-interdependent"),
		}),
);