/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	() => {
		const scopesAndVariables = new Map();

		return (
			{
				add,
				isIn,
			}
		);

		function add({
			scope,
			variables,
		}) {
			scopesAndVariables.set(
				scope,
				[
					...scopesAndVariables.get(scope) || [],
					...variables,
				],
			);
		}

		function isIn({
			ancestors,
			variable,
		}) {
			return (
				ancestors.some(
					ancestor => {
						const variablesInBlock = scopesAndVariables.get(ancestor);

						return (
							variablesInBlock
							&&
							variablesInBlock.includes(variable)
						);
					},
				)
			);
		}
	};