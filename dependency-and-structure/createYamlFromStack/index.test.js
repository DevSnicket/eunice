// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import callTestForSymmetrical from "../stackAndYamlTesting/callTestForSymmetrical";
import createYamlFromStack from ".";

describe(
	"createYamlFromStack",
	() =>
		callTestForSymmetrical({
			getActual:
				({ stack }) =>
					createYamlFromStack(stack),
			getExpected:
				({ yaml }) =>
					yaml,
			getName:
				({
					stackDescription,
					yaml,
				}) =>
					`"${stackDescription}" returns ${JSON.stringify(yaml)}`,
		}),
);