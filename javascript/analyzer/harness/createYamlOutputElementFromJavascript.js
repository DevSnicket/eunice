// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { callOrCreateElementOnError, createFillWithTitleElement } from "@devsnicket/eunice-test-harnesses";
import { createElement } from "react";
import getYamlFromJavascript from "../getYamlFromJavascript";

export default
javascript =>
	createFillWithTitleElement({
		content:
			callOrCreateElementOnError({
				action:
					() =>
						createElement(
							"pre",
							{
								style:
									{
										flex: 1,
										overflow: "auto",
									},
							},
							createElement(
								"code",
								{ id: "yaml" },
								getYamlFromJavascript(
									{ javascript },
								),
							),
						),
				createElement,
			}),
		title:
			"YAML",
	});