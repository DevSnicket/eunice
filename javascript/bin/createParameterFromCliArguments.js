module.exports =
	({
		directories = ".",
		identifierPrefixesOfRootItems,
		...restOfOptions
	}) => {
		return (
			{
				...restOfOptions,
				sources: [ ...createSources() ],
			}
		);

		function * createSources() {
			const
				iterators =
					{
						directory:
							getIterator(directories),
						identifierPrefixOfRootItems:
							getIterator(identifierPrefixesOfRootItems),
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
					identifierPrefixOfRootItems = iterators.identifierPrefixOfRootItems.next().value;

				return (
					(directory || identifierPrefixOfRootItems)
					&&
					{
						...{ directory },
						...{ identifierPrefixOfRootItems },
					}
				);
			}
		}
	};