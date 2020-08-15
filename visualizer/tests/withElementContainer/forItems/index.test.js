// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import assertGetSvgForYaml from "../assertGetSvgForYaml";
import createForItem from "./createForItem";
import path from "path";

test(
	"item elements can be created in a container",
	() =>
		assertGetSvgForYaml({
			elementContainerFactory:
				{ createForItem },
			expectedSvgDirectoryPath:
				__dirname,
			yamlDirectory:
				path.join("item", "no-dependencies", "short-identifier"),
		}),
);