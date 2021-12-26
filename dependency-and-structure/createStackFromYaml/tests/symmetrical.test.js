// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import callTestForSymmetrical from "../../stackAndYamlTesting/callTestForSymmetrical";
import createStackFromYaml from "..";

callTestForSymmetrical({
	getActual:
		({ yaml }) =>
			createStackFromYaml(yaml),
	getExpected:
		({ stack }) =>
			stack,
	getName:
		({
			stackDescription,
			yaml,
		}) =>
			`${JSON.stringify(yaml)} return "${stackDescription}"`,
});