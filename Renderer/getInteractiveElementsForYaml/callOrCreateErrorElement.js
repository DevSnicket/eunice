const { createElement } = require("react");

module.exports =
	action => {
		try {
			return action();
		} catch (error) {
			return createElement("div", null, error.message);
		}
	};