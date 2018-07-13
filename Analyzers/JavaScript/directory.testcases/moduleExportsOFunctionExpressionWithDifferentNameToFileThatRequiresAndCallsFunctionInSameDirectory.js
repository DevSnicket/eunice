const moduleExportsOfArrowFunction1 = require("./moduleExportsOfArrowFunction1");

module.exports =
	function differentName() {
		moduleExportsOfArrowFunction1();
	};