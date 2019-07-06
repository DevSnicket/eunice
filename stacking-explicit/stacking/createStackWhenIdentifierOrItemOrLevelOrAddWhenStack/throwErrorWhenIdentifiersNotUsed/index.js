/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		identifiersNotUsed,
		targetLevelOrStack,
	}) => {
		if (identifiersNotUsed)
			throw new Error(`Neither the following items were specified ${formatIdentifiers(identifiersNotUsed)}, nor was a single item level of "existing", in new the stack [${formatTargetLevelOrStack()}].`);

		function formatTargetLevelOrStack() {
			return (
				targetLevelOrStack.length
				?
				` ${joinIdentifiers(targetLevelOrStack.map(formatIdentifierOrLevel))} `
				:
				""
			);
		}
	};

function formatIdentifierOrLevel(
	identifierOrLevel,
) {
	return (
		Array.isArray(identifierOrLevel)
		?
		`[ ${formatIdentifiers(identifierOrLevel)} ]`
		:
		formatIdentifier(identifierOrLevel)
	);
}

function formatIdentifiers(
	identifiers,
) {
	return (
		joinIdentifiers(
			identifiers.map(formatIdentifier),
		)
	);
}

function formatIdentifier(
	identifier,
) {
	return `"${identifier}"`;
}

function joinIdentifiers(
	identifiers,
) {
	return identifiers.join(", ");
}