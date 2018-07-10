module.exports =
	() => {
		const ancestorsOfUndefinedVariables = new Map();

		return (
			{
				addAncestorsFor,
				hasReferenceTo,
			}
		);

		function addAncestorsFor({
			ancestors,
			variableName,
		}) {
			ancestorsOfUndefinedVariables.set(
				variableName,
				[
					...ancestorsOfUndefinedVariables.get(variableName) || [],
					...ancestors,
				]
			);
		}

		function hasReferenceTo({
			parent,
			variableName,
		}) {
			const potentialDeclarers =
				ancestorsOfUndefinedVariables.get(variableName);

			return (
				potentialDeclarers
				&&
				(!parent || potentialDeclarers.includes(parent))
			);
		}
	};