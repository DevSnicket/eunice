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