const moduleExportsOfFunctionArrow1 = require("./moduleExportsOfFunctionArrow1");

module.exports =
	function differentName() {
		moduleExportsOfFunctionArrow1();
	};