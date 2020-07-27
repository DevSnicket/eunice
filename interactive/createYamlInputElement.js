// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createStackWithDependencyCountFromYaml from "./createStackWithDependencyCountFromYaml";

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
						stack: createStackWithDependencyCountFromYaml(value),
						yaml: value,
					},
				),
		value:
			stateful.state.yaml,
	});