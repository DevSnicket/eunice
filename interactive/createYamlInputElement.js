// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import parseStackFromYaml from "./parseStackFromYaml";

export default ({
	createYamlEditorElement,
	stateful,
}) =>
	createYamlEditorElement({
		foldAll:
			true,
		setStateFromValue:
			value =>
				stateful.setState(
					{
						stack: parseStackFromYaml(value),
						yaml: value,
					},
				),
		value:
			stateful.state.yaml,
	});