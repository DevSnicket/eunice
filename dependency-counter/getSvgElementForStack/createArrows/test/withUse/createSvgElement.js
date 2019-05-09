module.exports =
	({
		createElement,
		elements,
		size: { height, width },
	}) =>
		createElement(
			"svg",
			{
				height,
				width,
				xmlns: "http://www.w3.org/2000/svg",
			},
			elements,
		);