// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import path from "path";
import testTestCase from "../testTestCase";

const firstDependsUponSecondTestCase =
	{
		expectedSvgFile: "first depends upon second",
		yaml: "[{ id: first, dependsUpon: second }, second ]",
	};

test.each(
	[
		[
			"first depends upon second",
			firstDependsUponSecondTestCase,
		],
		[
			"second depends upon first",
			{
				expectedSvgFile: "second depends upon first",
				yaml: "[ first, { id: second, dependsUpon: first } ]",
			},
		],
		[
			"upper depends upon lower",
			{
				expectedSvgFile: "upper depends upon lower",
				yaml: "[ [ { id: upper, dependsUpon: lower } ], [ lower ] ]",
			},
		],
		[
			"lower depends upon upper",
			{
				expectedSvgFile: "lower depends upon upper",
				yaml: "[ [ upper ], [ { id: lower, dependsUpon: upper } ] ]",
			},
		],
	],
)(
	"%s",
	(
		description,
		{
			expectedSvgFile,
			yaml,
		},
	) =>
		testTestCase({
			expectedFilePath:
				path.join(__dirname, `${expectedSvgFile}.svg`),
			expectedHtmlPrefix:
				"",
			locationHash:
				null,
			yaml,
		}),
);