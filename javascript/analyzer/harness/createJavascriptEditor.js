// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createCodeEditorForLanguage from "@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage";

export default () => {
	const codeEditor =
		createCodeEditorForLanguage(
			"javascript",
		);

	return { createEditorElement };

	function createEditorElement({
		createStateFromValue = null,
		stateful,
	}) {
		return (
			codeEditor
			.createEditorElement({
				setStateFromValue:
					value =>
						stateful.setState({
							...createStateFromValue && createStateFromValue(value),
							javascript: value,
						}),
				value:
					stateful.state.javascript,
			})
		);
	}
};