module.exports =
	() => {
		const blocksAndScopedVariables = new Map();

		return (
			{
				add,
				isIn,
			}
		);

		function add({
			block,
			variables,
		}) {
			blocksAndScopedVariables.set(
				block,
				[
					...blocksAndScopedVariables.get(block) || [],
					...variables,
				]
			);
		}

		function isIn({
			ancestors,
			variable,
		}) {
			return (
				ancestors.some(
					ancestor => {
						const variablesInBlock = blocksAndScopedVariables.get(ancestor);

						return (
							variablesInBlock
							&&
							variablesInBlock.includes(variable)
						);
					}
				)
			);
		}
	};