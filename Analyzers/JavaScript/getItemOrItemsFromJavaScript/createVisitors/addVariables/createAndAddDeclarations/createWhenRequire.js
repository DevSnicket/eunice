module.exports =
	({
		createVariablesFromIdentifier,
		initalization,
	}) => {
		return (
			createFromWhenRequire({
				dependsUponItemIdentifier: null,
				expression: initalization,
			})
			||
			createWhenMember()
		);

		function createWhenMember() {
			return (
				initalization.type === "MemberExpression"
				&&
				createFromWhenRequire({
					dependsUponItemIdentifier: initalization.property.name,
					expression: initalization.object,
				})
			);
		}

		function createFromWhenRequire({
			dependsUponItemIdentifier,
			expression,
		}) {
			return (
				isRequire()
				&&
				create()
			);

			function isRequire() {
				return (
					expression.type === "CallExpression"
					&&
					expression.callee.name === "require"
				);
			}

			function create() {
				const
					argument = getArgument(),
					variables = createVariablesFromIdentifier();

				return (
					variables
					.map(
						variable => (
							{
								...variable,
								dependsUpon:
									getOrCreateDependsUpon({
										identifier: argument,
										items: getOrCreateDependsUponForVariable(variable),
									}),
							}
						)
					)
				);

				function getArgument() {
					return expression.arguments[0].value;
				}
			}

			function getOrCreateDependsUponForVariable(
				variable
			) {
				return (
					dependsUponItemIdentifier
					?
					getOrCreateDependsUpon({
						identifier: dependsUponItemIdentifier,
						items: variable.dependsUpon,
					})
					:
					variable.dependsUpon
				);
			}
		}
	};

function getOrCreateDependsUpon({
	identifier,
	items,
}) {
	return (
		items
		?
		{
			id: identifier,
			items,
		}
		:
		identifier
	);
}