const createCodeEditorForLanguage = require("@devsnicket/eunice-test-harnesses/codeEditor/createEditorForLanguage");

module.exports =
	() => {
		const codeEditor =
			createCodeEditorForLanguage(
				"javascript",
			);

		return { createEditorElement };

		function createEditorElement({
			createElement,
			createStateFromValue = null,
			stateful,
		}) {
			return (
				codeEditor
				.createEditorElement({
					createElement,
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