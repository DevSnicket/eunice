/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const removeJsFilePathExtension = require("../../removeJsFilePathExtension");

module.exports =
	({
		createVariablesFromIdentifier,
		initialization,
	}) => {
		return (
			createFromWhenRequire({
				dependsUponItemIdentifier: null,
				expression: initialization,
			})
			||
			createWhenMember()
		);

		function createWhenMember() {
			return (
				initialization.type === "MemberExpression"
				&&
				createFromWhenRequire({
					dependsUponItemIdentifier: getProperty(),
					expression: initialization.object,
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
						),
					)
				);

				function getArgument() {
					return (
						removeJsFilePathExtension(
							expression.arguments[0].value,
						)
					);
				}
			}

			function getOrCreateDependsUponForVariable(
				variable,
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