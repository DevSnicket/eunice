/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	importDeclaration => {
		const from = importDeclaration.source.value;

		return importDeclaration.specifiers.map(createFromSpecifier);

		function createFromSpecifier({
			local,
			imported,
		}) {
			return (
				{
					dependsUpon: createDependsUpon(),
					id: local.name,
					type: "variable",
				}
			);

			function createDependsUpon() {
				return whenHasImported() || from;

				function whenHasImported() {
					return (
						imported
						&&
						{
							id: from,
							items: imported.name,
						}
					);
				}
			}
		}
	};