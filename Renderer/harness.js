const
	getSvgForYaml = require("./getSvgForYaml"),
	reactUiElements = require("../Harness/reactUiElements");

reactUiElements.renderColumnElementsIntoContainer(
	reactUiElements.createResizableColumnForYamlInput(`-
  - id: Upper First
    dependsUpon:
      - Upper Second
      - Lower First
      - Lower Second
  - id: Upper Second
    dependsUpon:
      - Upper First
      - Lower First
      - Lower Second  
-
  - id: Lower First
    dependsUpon:
      - Upper First
      - Upper Second
      - Lower Second
  - id: Lower Second
    dependsUpon:
      - Upper First
      - Upper Second
      - Lower First`),
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