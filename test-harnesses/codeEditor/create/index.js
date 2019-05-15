const createMonacoEditor = require("./createMonacoEditor");

module.exports =
	({
		language,
		setStateFromValue,
		value,
	}) => {
		let monacoEditor = null;

		return (
			{
				createElementProperties,
				updateValue,
			}
		);

		function updateValue() {
			if (monacoEditor && monacoEditor.getValue() !== value)
				monacoEditor.setValue(value);
		}

		function createElementProperties() {
			return (
				{
					ref:
						setDomContainerElement,
					style:
						// Mitigates Monaco editor (0.17.0) automaticLayout property set to true not resizing the height back down to being smaller
						{ overflow: "hidden" },
				}
			);
		}

		function setDomContainerElement(
			domElement,
		) {
			if (domElement !== null && isNewEditorRequired())
				monacoEditor =
					createMonacoEditor({
						domElement,
						language,
						setStateFromValue,
						value,
					});

			function isNewEditorRequired() {
				return (
					!monacoEditor
					||
					disposeEditorWhenDomElementHasChanged({
						domElement,
						editor: monacoEditor,
					})
				);
			}
		}
	};

function disposeEditorWhenDomElementHasChanged({
	domElement,
	editor,
}) {
	if (editor.getDomNode().parentElement === domElement)
		return false;
	else {
		editor.dispose();

		return true;
	}
}