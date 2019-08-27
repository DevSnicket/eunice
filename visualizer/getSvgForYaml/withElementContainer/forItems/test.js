// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	assertGetSvgForYaml = require("../assertGetSvgForYaml"),
	{ createElement } = require("react");

test(
	"item elements can be created in a container",
	() =>
		assertGetSvgForYaml({
			elementContainerFactory:
				{
					createForItem:
						({ element, item }) =>
							createElement(
								"containerElement",
								{ item: item.id },
								element,
							),
				},
			expectedSvgDirectoryPath:
				__dirname,
			yamlDirectory:
				"single",
		}),
);