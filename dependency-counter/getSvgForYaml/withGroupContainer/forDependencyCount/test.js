const
	assertGetSvgForYaml = require("../assertGetSvgForYaml"),
	{ createElement } = require("react"),
	path = require("path");

test(
	"dependency count groups can be created with a container",
	() =>
		assertGetSvgForYaml({
			expectedSvgDirectoryPath:
				__dirname,
			groupContainerFactory:
				{
					createForDependencyCount:
						({ group, item, relationship, structure }) =>
							createElement(
								"containerElement",
								{
									id: item.id,
									relationship,
									structure,
								},
								group,
							),
				},
			yamlDirectory:
				path.join("stack", "two-of-two-items-interdependent"),
		}),
);