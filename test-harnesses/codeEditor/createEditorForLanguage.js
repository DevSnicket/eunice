/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import { createElement } from "react";
import { editor as monacoEditorFactory } from "monaco-editor";

export default
language => {
	/** @type {import("monaco-editor").editor.IStandaloneCodeEditor} */
	let monacoEditor = null;

	/** @type {{dispose, setStateFromValue}} */
	let onDidChangeModelContent = null;

	return { createEditorElement };

	function createEditorElement({
		foldAll = false,
		setStateFromValue,
		value,
	}) {
		return (
			createElement(
				"div",
				{
					ref: setDomContainerElement,
					// Mitigates automaticLayout property set to true not resizing the height back down to being smaller
					style: { overflow: "hidden" },
				},
			)
		);

		function setDomContainerElement(
			domElement,
		) {
			if (domElement !== null)
				if (isNewEditorRequired())
					initializeMonacoEditor();
				else
					updateMonacoEditor();

			function isNewEditorRequired() {
				return (
					!monacoEditor
					||
					disposeWhenDomElementHasChanged({
						disposables:
							[ monacoEditor, onDidChangeModelContent ],
						domElement,
						editor:
							monacoEditor,
					})
				);
			}

			function initializeMonacoEditor() {
				monacoEditor =
					monacoEditorFactory.create(
						domElement,
						{
							automaticLayout: true,
							language,
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							value,
						},
					);

				if (foldAll)
					monacoEditor.getAction("editor.foldAll")
					.run();

				initializeOnDidChangeModelContent();
			}

			function updateMonacoEditor() {
				updateValue();
				updateOnDidChangeModelContent();

				function updateValue() {
					if (monacoEditor.getValue() !== value)
						monacoEditor.setValue(value);
				}

				function updateOnDidChangeModelContent() {
					if (onDidChangeModelContent.setStateFromValue !== setStateFromValue) {
						if (onDidChangeModelContent)
							onDidChangeModelContent.dispose();

						initializeOnDidChangeModelContent();
					}
				}
			}

			function initializeOnDidChangeModelContent() {
				onDidChangeModelContent =
					{
						dispose:
							monacoEditor.onDidChangeModelContent(
								() =>
									setStateFromValue(
										monacoEditor.getValue(),
									),
							)
							.dispose,
						setStateFromValue,
					};
			}
		}
	}
};

function disposeWhenDomElementHasChanged({
	domElement,
	editor,
	disposables,
}) {
	if (editor.getDomNode().parentElement === domElement)
		return false;
	else {
		for (const { dispose } of disposables)
			dispose();

		return true;
	}
}