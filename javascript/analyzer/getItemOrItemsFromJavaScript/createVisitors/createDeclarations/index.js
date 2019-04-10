const createItemsFromDeclarations = require("./createItemsFromDeclarations");

module.exports =
	() => {
		const declarationsByParents = new Map();

		return (
			{
				addDeclarationIn,
				addDeclarationsIn,
				createItemsForAndRemoveDeclarationsIn,
				findDeclarationAndParent,
				getGroupedByParent,
			}
		);

		function addDeclarationIn({
			declaration,
			parent,
		}) {
			addDeclarationsIn({
				declarations: [ declaration ],
				parent,
			});
		}

		function addDeclarationsIn({
			declarations,
			parent,
		}) {
			declarationsByParents.set(
				parent,
				[
					...declarationsByParents.get(parent) || [],
					...declarations,
				],
			);
		}

		function findDeclarationAndParent(
			predicate,
		) {
			return (
				[ ...declarationsByParents.keys() ]
				.reverse()
				.map(
					declarationParent => (
						{
							declaration:
								findDeclarationIn({
									parent: declarationParent,
									predicate,
								}),
							parent:
								declarationParent,
						}
					),
				)
				.filter(
					declarationAndParent =>
						declarationAndParent.declaration,
				)[0]
			);
		}

		function findDeclarationIn({
			parent,
			predicate,
		}) {
			const declarationsOfParent =
				declarationsByParents.get(parent);

			return (
				declarationsOfParent
				&&
				declarationsOfParent.find(predicate)
			);
		}

		function createItemsForAndRemoveDeclarationsIn(
			parent,
		) {
			const declarations = declarationsByParents.get(parent);

			declarationsByParents.delete(parent);

			return createItemsFromDeclarations(declarations);
		}

		function * getGroupedByParent() {
			for (const [ parent, declarations ] of declarationsByParents.entries())
				yield (
					{
						declarations,
						parent,
					}
				);
		}
	};