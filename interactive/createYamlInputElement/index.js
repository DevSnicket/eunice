// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		createFillWithTitleElement,
		createYamlEditorElement,
		stateful,
	}) =>
		createFillWithTitleElement({
			content:
				createYamlEditorElement({
					foldAll:
						true,
					setStateFromValue:
						value => stateful.setState({ yaml: value }),
					value:
						stateful.state.yaml,
				}),
			title:
				"YAML",
		});