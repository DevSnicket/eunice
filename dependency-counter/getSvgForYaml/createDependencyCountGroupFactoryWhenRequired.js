module.exports =
	({
		arrow,
		count,
		createTextGroup,
		font,
	}) => {
		return (count > 0) && create();

		function create() {
			const width = font.measure(count) + arrow.horizontalMargin;

			return (
				{
					create:
						({
							left,
							top,
						}) =>
							createTextGroup({
								attributes: { href: `#${arrow.id}` },
								className: "dependency",
								elementName: "use",
								height: arrow.height,
								left,
								paddingRight: arrow.paddingRight,
								text: count,
								top,
								width,
							}),
					width,
				}
			);
		}
	};