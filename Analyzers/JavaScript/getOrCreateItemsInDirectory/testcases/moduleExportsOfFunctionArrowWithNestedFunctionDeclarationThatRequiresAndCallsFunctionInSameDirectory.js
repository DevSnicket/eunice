const moduleExportsOfFunctionArrow1 = require("./moduleExportsOfFunctionArrow1");

module.exports = 
	() => {
		function nestedFunction() {
			moduleExportsOfFunctionArrow1();
		}
	};