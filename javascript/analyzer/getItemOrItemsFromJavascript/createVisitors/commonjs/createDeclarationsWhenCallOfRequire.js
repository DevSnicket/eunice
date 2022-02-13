/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	callOrMemberOfCallExpression,
	createPathBasedDependsUpon,
	directoryAbsolutePath,
	getIsDestructuredAndVariables,
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
					expression.arguments[0].value,
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
	}
};

function create({
	createPathBasedDependsUpon,
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
								getOrCreateDependsUponForVariableName(
									isDestructured
									&&
									variable.id,
								),
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