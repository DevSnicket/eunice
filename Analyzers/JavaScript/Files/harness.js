const
	createElement = require("react").createElement,
	formatYaml = require("js-yaml").safeDump,
	parseJavaScript = require("acorn").parse,
	reactUiElements = require("../../../Harness/reactUiElements"),
	walk = require("acorn/dist/walk");

const analyze = require("./analyze");

reactUiElements.renderColumnElementsIntoContainer(
	reactUiElements.createResizableColumnForJavaScriptInput(),
	reactUiElements.createResizableColumn({
		element:
			createElement(
				"pre",
				{ style: { flex: 1, overflow: "scroll" } },
				createElement("code", { id: "yaml" })
			),
		title:
			"YAML",
	})
);

const
	javascriptTextArea = document.getElementById("javascript"),
	yamlCode = document.getElementById("yaml");

javascriptTextArea.addEventListener("input", generateFromTextareaIntoDiv);

generateFromTextareaIntoDiv();

function generateFromTextareaIntoDiv() {
	const yaml =
		analyze({
			file: parseJavaScript(javascriptTextArea.value, { ecmaVersion: 9 }),
			walk: walk.ancestor,
		});

	yamlCode.innerHTML =
		yaml
		?
		formatYaml(yaml)
		.trim()
		:
		"";
}