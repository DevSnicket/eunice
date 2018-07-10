const
	createItemsFor = require("./createDeclarations/createItemsFor");

module.exports =
	() => {
		const declarationsByParents = new Map();

		return (
			{
				addDeclarationIn,
				addDeclarationsIn,
				any,
				createItemsFor:
					parent =>
						createItemsFor({
							declarationsByParents,
							parent,
						}),
				findDeclarationAndParent,
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
				]
			);
		}

		function any() {
			return declarationsByParents.size != 0;
		}

		function findDeclarationAndParent(
			predicate
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
					)
				)
				.filter(
					declarationAndParent =>
						declarationAndParent.declaration
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
	};