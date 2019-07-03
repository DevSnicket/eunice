/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createProcessorsMenuElements = require("./createProcessorsMenuElements"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

module.exports =
	({
		createElement,
		createFillWithTitleElement,
		createYamlEditorElement,
		stateful,
	}) =>
		createFillWithTitleElement({
			content:
				createYamlEditorElement({
					foldAll:
						true,
					setStateFromValue:
						value => stateful.setState({ yaml: value }),
					value:
						stateful.state.yaml,
				}),
			title:
				createTitleElement({
					createElement,
					processorsMenuElements:
						createProcessorsMenuElements({
							createElement,
							processors:
								stateful.state.processors || [ ...processorPlugins ],
							setProcessors:
								processors => stateful.setState({ processors }),
						}),
				}),
		});

function createTitleElement({
	createElement,
	processorsMenuElements,
}) {
	return (
		createElement(
			"div",
			{
				style:
					{
						display: "flex",
						flexFlow: "wrap",
					},
			},
			createElement(
				"span",
				{ style: { flexGrow: 1 } },
				"YAML",
			),
			...processorsMenuElements,
		)
	);
}