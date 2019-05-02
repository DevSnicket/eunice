module.exports =
	({
		createElement,
		href,
		identifier,
	}) => {
		return (
			identifier
			?
			createAnchor(
				{ text: identifier },
			)
			:
			createAnchor({
				style: { fontStyle: "italic" },
				text: "anonymous",
			})
		);

		function createAnchor({
			style = null,
			text,
		}) {
			return (
				createElement(
					"a",
					{
						href,
						style,
					},
					text,
				)
			);
		}
	};