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
				findDeclarationFrom,
				findDeclarationIn,
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

		function findDeclarationFrom({
			parent,
			predicate,
		}) {
			return (
				[ ...declarationsByParents.keys() ]
				.reverse()
				.filter(
					declarationsParent =>
						declarationsParent != parent
				)
				.map(
					declarationsParent =>
						findDeclarationIn({
							parent: declarationsParent,
							predicate,
						})
				)
				.filter(
					variable =>
						variable
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