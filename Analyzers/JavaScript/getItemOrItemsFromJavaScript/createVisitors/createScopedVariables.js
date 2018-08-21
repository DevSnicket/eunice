module.exports =
	() => {
		const scopesAndVariables = new Map();

		return (
			{
				add,
				isIn,
			}
		);

		function add({
			scope,
			variables,
		}) {
			scopesAndVariables.set(
				scope,
				[
					...scopesAndVariables.get(scope) || [],
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
						const variablesInBlock = scopesAndVariables.get(ancestor);

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