/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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