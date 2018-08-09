const
	createDependenciesInlineElements = require("./createDependenciesInlineElements"),
	getIdentifierClassNameAndText = require("../getIdentifierClassNameAndText");

module.exports =
	({
		createItemGroupWrapper,
		createTextGroup,
		dependencyGroupFactories,
		font,
		identifier,
	}) => {
		const { className, text } =
			getIdentifierClassNameAndText({
				baseClassName: "item",
				identifier,
			});

		const
			height = 40 + calculateMaximumDependencyHeight(),
			width = font.measure(text) + 20;

		return (
			{
				create:
					({
						left,
						top,
					}) =>
						createItemGroupWrapper(
							createTextGroup({
								attributes:
									null,
								className,
								elementName:
									"rect",
								elementsBelowText:
									createDependenciesInlineElementsWhenRequired({
										center: left + (width / 2),
										top: top + 34,
									}),
								height,
								key:
									text,
								left,
								padding:
									{
										right: 0,
										top: 20,
									},
								text,
								top,
								width,
							})
						),
				height,
				width,
			}
		);

		function calculateMaximumDependencyHeight() {
			return (
				dependencyGroupFactories
				?
				dependencyGroupFactories.reduce(
					(
						maximum,
						dependencyGroupFactory
					) =>
						Math.max(
							maximum,
							dependencyGroupFactory.height
						),
					0
				)
				:
				0
			);
		}

		function createDependenciesInlineElementsWhenRequired({
			center,
			top,
		}) {
			return (
				dependencyGroupFactories
				&&
				createDependenciesInlineElements({
					center,
					groupFactories: dependencyGroupFactories,
					top,
				})
			);
		}
	};