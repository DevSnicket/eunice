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