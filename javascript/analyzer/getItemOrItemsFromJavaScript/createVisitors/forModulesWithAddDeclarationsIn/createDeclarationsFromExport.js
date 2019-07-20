/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		source,
		specifiers,
	}) =>
		specifiers
		.flatMap(
			source
			?
			withSource(source.value).createDeclarationFromSpecifier
			:
			createAliasedDeclarationsFromSpecifier,
		);

function withSource(
	source,
) {
	return { createDeclarationFromSpecifier };

	function createDeclarationFromSpecifier({
		exported,
		local,
	}) {
		return (
			{
				dependsUpon:
					{
						id: source,
						items: local.name,
					},
				id:
					exported.name,
				type:
					"export",
			}
		);
	}
}

function createAliasedDeclarationsFromSpecifier({
	exported,
	local,
}) {
	return whenHasAlias() || [];

	function whenHasAlias() {
		return (
			exported.name !== local.name
			&&
			{
				dependsUpon:
					local.name,
				id:
					exported.name,
				isPeerFunctionRequired:
					true,
				type:
					"export",
			}
		);
	}
}