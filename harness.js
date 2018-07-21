const
	getSvgForYaml = require("./Renderer/getSvgForYaml"),
	getYamlFromJavaScript = require("./Analyzers/JavaScript/getYamlFromJavaScript"),
	reactUiElements = require("./Harnesses/reactUiElements");

reactUiElements.renderColumnElementsIntoContainer(
	reactUiElements.createResizableColumnForJavaScriptInput(),
	reactUiElements.createResizableColumnForYamlInput(),
	reactUiElements.createResizableColumnForSvgOutput()
);

const
	javascriptTextArea = document.getElementById("javascript"),
	svgDiv = document.getElementById("svg"),
	yamlTextArea = document.getElementById("yaml");

javascriptTextArea.addEventListener("input", generateFromTextareaIntoDiv);
yamlTextArea.addEventListener("input", renderFromTextareaIntoDiv);

generateFromTextareaIntoDiv();

function generateFromTextareaIntoDiv() {
	yamlTextArea.value = getYamlFromJavaScript(javascriptTextArea.value);

	renderFromTextareaIntoDiv();
}

function renderFromTextareaIntoDiv() {
	svgDiv.innerHTML = getSvgForYaml(yamlTextArea.value);
}