const
	assertGetSvgForYaml = require("../assertGetSvgForYaml"),
	{ createElement } = require("react");

test(
	"item groups can be created with a container",
	() =>
		assertGetSvgForYaml({
			expectedSvgDirectoryPath:
				__dirname,
			groupContainerFactory:
				{
					createForItem:
						({ group, item }) =>
							createElement(
								"containerElement",
								{ item: item.id },
								group,
							),
				},
			yamlDirectory:
				"single",
		}),
);