// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createJavascriptSubstitutions from "../createJavascriptSubstitutions";
import createWebpackConfiguration from "../../createWebpackConfiguration";
import path from "path";

export default
(environment, { mode }) =>
	createWebpackConfiguration({
		directory:
			path.join(__dirname, "output"),
		javascriptSubstitutions:
			createJavascriptSubstitutions({
				areDependenciesOfAncestorsIncluded:
					false,
				isInferStacksEnabled:
					true,
				mode,
				yamlFilePath:
					path.join(__dirname, ".yaml"),
			}),
		title:
			"interactive example YAML",
	});