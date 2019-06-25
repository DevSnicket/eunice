/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const formatMessageForTypeWhenAny = require("./formatMessageForTypeWhenAny");

module.exports =
	({
		declarations,
		dependsUponIdentifiers,
	}) => {
		const message =
			[
				formatMessageForDeclarations(
					declarations,
				),
				formatMessageForDependsUponIdentifiers(
					dependsUponIdentifiers,
				),
			]
			.filter(Boolean)
			.join("\n\n");

		if (message)
			throw new Error(message);
	};

function formatMessageForDeclarations(
	declarations,
) {
	return (
		formatMessageForTypeWhenAny({
			itemIdentifierSelector:
				declaration => declaration.id.name,
			itemsSelector:
				hasItems => hasItems.declarations,
			parentsWithItems:
				declarations,
			type:
				"declarations",
		})
	);
}

function formatMessageForDependsUponIdentifiers(
	dependsUponIdentifiers,
) {
	return (
		formatMessageForTypeWhenAny({
			itemIdentifierSelector:
				identifier => identifier,
			itemsSelector:
				hasItems => hasItems.identifiers,
			parentsWithItems:
				dependsUponIdentifiers,
			type:
				"dependencies",
		})
	);
}