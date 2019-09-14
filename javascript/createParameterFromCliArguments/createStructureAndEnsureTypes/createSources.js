// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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