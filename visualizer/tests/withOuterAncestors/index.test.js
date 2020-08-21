// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getSvgForStack from "../getSvgForStack";
import parseStackFromYaml from "../parseStackFromYaml";
import path from "path";
import readTestFile from "../readTestFile";

test.each([
	[ true ],
	[ false, [ "..", "test-cases", "item", "with-dependencies", "outer", "above-and-below-and-same" ] ],
])(
	"with are ancestors included %s",
	async(
		areDependenciesOfAncestorsIncluded,
		expectedFilePathSegments = [],
	) =>
		expect(
			getSvgForStack({
				areDependenciesOfAncestorsIncluded,
				stack:
					parseStackFromYaml(
						await readTestFile(
							path.join(__dirname, ".yaml"),
						),
					),
			}),
		)
		.toEqual(
			await readTestFile(
				path.join(...[
					__dirname,
					...expectedFilePathSegments,
					".svg",
				]),
			),
		),
);