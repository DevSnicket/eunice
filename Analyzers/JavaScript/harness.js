const
	createElement = require("react").createElement,
	reactUiElements = require("../../Harnesses/reactUiElements");

const getYamlFromJavaScript = require("./getYamlFromJavaScript");

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
	yamlCode.innerHTML = getYamlFromJavaScript(javascriptTextArea.value);
}