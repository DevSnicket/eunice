/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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
					style:
						{
							height: "100%",
							// Mitigates automaticLayout property set to true not resizing the height back down to being smaller
							overflow: "hidden",
						},
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