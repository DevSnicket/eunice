module.exports =
	({
		action,
		createElement,
	}) => {
		try {
			return action();
		} catch (error) {
			return createElement("div", null, error.message);
		}
	};