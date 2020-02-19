// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import assertGetSvgForYaml from "../assertGetSvgForYaml";
import { createElement } from "react";
import path from "path";

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