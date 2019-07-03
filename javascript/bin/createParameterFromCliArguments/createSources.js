/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
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
	};