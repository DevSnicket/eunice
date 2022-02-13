/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default
function * createSources({
	directories,
	rootItemIdentifiers,
}) {
	const
		iterators =
			{
				directory:
					getIterator(directories),
				rootItemIdentifier:
					getIterator(rootItemIdentifiers),
			};

	let source = null;

	do {
		source = getNext();

		if (source)
			yield source;
	}
	while (source);

	function getIterator(
		argument,
	) {
		return (
			Array.isArray(argument)
			?
			argument[Symbol.iterator]()
			:
			yieldArgument()
		);

		function * yieldArgument() {
			yield argument;
		}
	}

	function getNext() {
		const
			directory = iterators.directory.next().value,
			rootItemIdentifier = iterators.rootItemIdentifier.next().value;

		return (
			(directory || rootItemIdentifier)
			&&
			{
				...{ directory },
				...{ rootItemIdentifier },
			}
		);
	}
}