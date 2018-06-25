const createDependenciesInlineElements = require("./createDependenciesInlineElements");

module.exports =
	({
		createTextGroup,
		dependencyGroupFactories,
		font,
		identifier,
	}) => {
		const paddingBottom = calculateMaximumDependencyHeight();

		const
			height = 40 + paddingBottom,
			width = font.measure(identifier) + 20;

		return (
			{
				create:
					({
						left,
						top,
					}) =>
						createTextGroup({
							attributes:
								null,
							className:
								"item",
							elementName:
								"rect",
							elementsBelowText:
								createDependenciesInlineElementsWhenRequired({
									center: left + (width / 2),
									top: top + 34,
								}),
							height,
							left,
							paddingBottom,
							paddingRight:
								0,
							text:
								identifier,
							top,
							width,
						}),
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