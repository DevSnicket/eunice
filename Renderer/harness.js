const
	getSvgForYaml = require("./getSvgForYaml"),
	reactUiElements = require("../Harnesses/reactUiElements");

reactUiElements.renderColumnElementsIntoContainer(
	reactUiElements.createResizableColumnForYamlInput(yamlFromWebPack),
	reactUiElements.createResizableColumnForSvgOutput()
);

const
	svgDiv = document.getElementById("svg"),
	yamlTextArea = document.getElementById("yaml");

yamlTextArea.addEventListener("input", renderFromTextareaIntoDiv);

renderFromTextareaIntoDiv();

function renderFromTextareaIntoDiv() {
	svgDiv.innerHTML = getSvgForYaml(yamlTextArea.value);
}