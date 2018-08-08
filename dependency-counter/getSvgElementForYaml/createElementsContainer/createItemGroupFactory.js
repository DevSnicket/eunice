const createDependenciesInlineElements = require("./createDependenciesInlineElements");

module.exports =
	({
		createItemGroupWrapper,
		createTextGroup,
		dependencyGroupFactories,
		font,
		identifier,
	}) => {
		const
			paddingBottom = calculateMaximumDependencyHeight(),
			text = identifier || "anonymous";

		const
			height = 40 + paddingBottom,
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
								className:
									getClassNameForHasIdentifier(
										identifier
									),
								elementName:
									"rect",
								elementsBelowText:
									createDependenciesInlineElementsWhenRequired({
										center: left + (width / 2),
										top: top + 34,
									}),
								height,
								key:
									identifier,
								left,
								paddingBottom,
								paddingRight:
									0,
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

function getClassNameForHasIdentifier(
	hasIdentifier
) {
	return (
		[
			"item",
			...hasIdentifier ? [] : [ "anonymous" ],
		]
		.join(" ")
	);
}