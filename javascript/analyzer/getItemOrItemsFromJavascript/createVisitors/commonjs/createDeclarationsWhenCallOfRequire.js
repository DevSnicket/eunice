// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createIndexDependsUponWhenDirectory from "./createIndexDependsUponWhenDirectory";

export default ({
	callOrMemberOfCallExpression,
	createPathBasedDependsUpon,
	directoryAbsolutePath,
	getIsDestructuredAndVariables,
	removeExtensionFromFilePath,
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
				createPathBasedDependsUpon,
				directoryAbsolutePath,
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
	createPathBasedDependsUpon,
	directoryAbsolutePath,
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
						createPathBasedDependsUpon({
							items:
								createIndexDependsUponWhenDirectory({
									directoryAbsolutePath,
									fileOrDirectoryPath:
										path,
									items:
										getOrCreateDependsUponForVariableName(
											isDestructured
											&&
											variable.id,
										),
								}),
							path,
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