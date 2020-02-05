const commonjsModuleExportsOfFunctionArrow1 = require("./commonjsModuleExportsOfFunctionArrow1");

module.exports = 
	() => {
		function nestedFunction() {
			commonjsModuleExportsOfFunctionArrow1();
		}
	};