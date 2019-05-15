const
	createMonacoEditor = require("monaco-editor").editor.create,
	serviceWorkers = require("../serviceWorkers");

module.exports =
	({
		domElement,
		language,
		setStateFromValue,
		value,
	}) => {
		serviceWorkers.ensureMonacoGlobalInitialized();

		const monacoEditor =
			createMonacoEditor(
				domElement,
				{
					automaticLayout: true,
					language,
					minimap: { enabled: false },
					scrollBeyondLastLine: false,
					value,
				},
			);

		monacoEditor.onDidChangeModelContent(
			() =>
				setStateFromValue(
					monacoEditor.getValue(),
				),
		);

		return monacoEditor;
	};