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
					true,
				isInferStacksEnabled:
					false,
				mode,
				yamlFilePath:
					path.join("..", "eunice-javascript", "dogfooding", "output", "index.yaml"),
			}),
		title:
			"interactive dogfooding from eunice-javascript repository",
	});