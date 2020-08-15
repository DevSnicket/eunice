// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createForDependencyCount from "../withElementContainer/forDependencyCount/createForDependencyCount";
import createForItem from "../withElementContainer/forItems/createForItem";
import getFirstChildStack from "../withParent/getFirstChildStack";
import getSvgForStack from "../getSvgForStack";
import parseStackFromYaml from "../parseStackFromYaml";
import path from "path";
import readTestFile from "../readTestFile";

test(
	"dependency count and item elements can be created in a container with parent",
	async() =>
		expect(
			getSvgForStack({
				elementContainerFactory:
					{
						createForDependencyCount,
						createForItem,
					},
				stack:
					getFirstChildStack(
						parseStackFromYaml(
							await readTestFile(
								// path.join(__dirname, "..", "withParent", "test-cases", "parent-with-dependencies", "child-item", "inner-and-outer", ".yaml"),
								path.join(__dirname, ".yaml"),
							),
						),
					),
			}),
		)
		.toEqual(
			await readTestFile(
				path.join(
					__dirname,
					".svg",
				),
			),
		),
);