const
	getSvgForYaml = require("./Renderer/getSvgForYaml"),
	getYamlForJavaScript = require("./Analyzers/JavaScript/getYamlForJavaScript"),
	reactUiElements = require("./Harness/reactUiElements");

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
	yamlTextArea.value = getYamlForJavaScript(javascriptTextArea.value);

	renderFromTextareaIntoDiv();
}

function renderFromTextareaIntoDiv() {
	svgDiv.innerHTML = getSvgForYaml(yamlTextArea.value);
}