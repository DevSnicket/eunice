// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default
declarations => {
	return (
		declarations
		&&
		declarations.flatMap(createRelevantItemsFromDeclaration)
	);

	function createRelevantItemsFromDeclaration(
		declaration,
	) {
		return whenRelevant() || [];

		function whenRelevant() {
			return (
				isDeclarationRelevant(declaration)
				&&
				createItemFromDeclaration({
					...declaration,
					dependsUpon:
						hasPeerFunctionWhenRequired()
						&&
						declaration.dependsUpon,
					type:
						getOrInferType(),
				})
			);

			function getOrInferType() {
				return declaration.type || inferType();

				function inferType() {
					return (
						hasPeerExport(declaration.id)
						&&
						"export"
					);
				}
			}

			function hasPeerFunctionWhenRequired() {
				return (
					!declaration.isPeerFunctionRequired
					||
					hasPeerFunction(declaration.dependsUpon)
				);
			}
		}
	}

	function hasPeerExport(
		identifier,
	) {
		return (
			identifier
			&&
			declarations.some(
				declaration =>
					declaration.type === "export"
					&&
					declaration.id === identifier,
			)
		);
	}

	function hasPeerFunction(
		identifier,
	) {
		return (
			declarations.some(
				declaration =>
					!declaration.type
					&&
					declaration.id === identifier,
			)
		);
	}
};

function isDeclarationRelevant(
	declaration,
) {
	return (
		isNotSelfDependentExport()
		&&
		isUsedInNestedFunctionWhenRequired()
	);

	function isNotSelfDependentExport() {
		return (
			declaration.type !== "export"
			||
			!declaration.id
			||
			declaration.id !== declaration.dependsUpon
		);
	}

	function isUsedInNestedFunctionWhenRequired() {
		return (
			(declaration.type !== "import" && declaration.type !== "variable")
			||
			declaration.isCalledFromNestedFunction
		);
	}
}

function createItemFromDeclaration({
	id,
	dependsUpon,
	items,
	type,
}) {
	return whenStructured() || id;

	function whenStructured() {
		return (
			(dependsUpon || items || type)
			&&
			{
				...id && { id },
				...type && { type },
				...dependsUpon && { dependsUpon },
				...items && { items },
			}
		);
	}
}