/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const removeJsFilePathExtension = require("../../removeJsFilePathExtension");

module.exports =
	({
		getIsDestructuredAndVariables,
		initialization,
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
					removeJsFilePathExtension(
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