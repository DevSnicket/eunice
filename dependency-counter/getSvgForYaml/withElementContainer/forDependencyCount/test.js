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
						({ element, item, relationship, structure }) =>
							createElement(
								"containerElement",
								{
									id: item.id,
									relationship,
									structure,
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