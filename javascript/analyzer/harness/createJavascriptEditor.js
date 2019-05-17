const createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage");

module.exports =
	() => {
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