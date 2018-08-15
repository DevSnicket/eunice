module.exports =
	({
		arrow,
		count,
		createTextGroup,
		font,
		key,
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
								key,
								left,
								padding:
									{
										left: (width - arrow.paddingRight) / 2,
										top: 12,
									},
								text: count,
								top,
								width,
							}),
					height:
						arrow.height,
					width,
				}
			);
		}
	};