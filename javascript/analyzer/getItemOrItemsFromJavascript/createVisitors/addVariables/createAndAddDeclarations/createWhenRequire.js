// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		getIsDestructuredAndVariables,
		initialization,
		removeExtensionFromFilePath,
	}) => {
		return (
			createFromWhenRequire({
				expression:
					initialization,
				getOrCreateDependsUponForVariableName:
					name => name,
			})
			||
			createWhenMember()
		);

		function createWhenMember() {
			return (
				initialization.type === "MemberExpression"
				&&
				createFromWhenRequire({
					expression:
						initialization.object,
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
						initialization.computed
						?
						initialization.property.value
						:
						initialization.property.name
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
	variables,
}) {
	return (
		variables
		.map(
			variable => (
				{
					...variable,
					dependsUpon:
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