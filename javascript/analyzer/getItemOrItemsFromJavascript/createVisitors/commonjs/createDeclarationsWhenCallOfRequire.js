// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		callOrMemberOfCallExpression,
		getIsDestructuredAndVariables,
		removeExtensionFromFilePath,
		splitDependsUponIntoPathHierarchy,
	}) => {
		return (
			createFromWhenRequire({
				expression:
					callOrMemberOfCallExpression,
				getOrCreateDependsUponForVariableName:
					name => name,
			})
			||
			createWhenMember()
		);

		function createWhenMember() {
			return (
				callOrMemberOfCallExpression.type === "MemberExpression"
				&&
				createFromWhenRequire({
					expression:
						callOrMemberOfCallExpression.object,
					getOrCreateDependsUponForVariableName,
				})
			);

			function getOrCreateDependsUponForVariableName(
				name,
			) {
				return (
					getOrCreateDependsUpon({
						identifier: getProperty(),
						items: name,
					})
				);

				function getProperty() {
					return (
						callOrMemberOfCallExpression.computed
						?
						callOrMemberOfCallExpression.property.value
						:
						callOrMemberOfCallExpression.property.name
					);
				}
			}
		}

		function createFromWhenRequire({
			expression,
			getOrCreateDependsUponForVariableName,
		}) {
			return (
				isRequire()
				&&
				create({
					getOrCreateDependsUponForVariableName,
					path:
						getPath(),
					splitDependsUponIntoPathHierarchy,
					...getIsDestructuredAndVariables(),
				})
			);

			function isRequire() {
				return (
					expression.type === "CallExpression"
					&&
					expression.callee.name === "require"
				);
			}

			function getPath() {
				return (
					removeExtensionFromFilePath(
						expression.arguments[0].value,
					)
				);
			}
		}
	};

function create({
	getOrCreateDependsUponForVariableName,
	isDestructured,
	path,
	splitDependsUponIntoPathHierarchy,
	variables,
}) {
	return (
		variables
		.map(
			variable => (
				{
					...variable,
					dependsUpon:
						splitDependsUponIntoPathHierarchy(
							getOrCreateDependsUpon({
								identifier:
									path,
								items:
									getOrCreateDependsUponForVariableName(
										isDestructured
										&&
										variable.id,
									),
							}),
						),
				}
			),
		)
	);
}

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