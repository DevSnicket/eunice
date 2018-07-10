module.exports =
	{
		findIdentifiableParent,
		findParents,
	};

function findIdentifiableParent(
	ancestors
) {
	for (const parent of getParents(ancestors)) {
		const identifiableParent =
			parent.functionDeclaration
			||
			(parent.isIdentifiable && parent.functionExpression);

		if (identifiableParent)
			return identifiableParent;
	}

	return null;
}

function findParents(
	ancestors
) {
	const anonymous = [];

	for (const parent of getParents(ancestors)) {
		if (parent.functionExpression)
			if (parent.isIdentifiable)
				return createParentFunctionsWithIdentifiable(parent.functionExpression);
			else
				anonymous.push(parent.functionExpression);

		if (parent.functionDeclaration)
			return createParentFunctionsWithIdentifiable(parent.functionDeclaration);
	}

	return getAnonymousPropertyWhenAny();

	function createParentFunctionsWithIdentifiable(
		identifiable
	) {
		return (
			{
				...getAnonymousPropertyWhenAny(),
				identifiable,
			}
		);
	}

	function getAnonymousPropertyWhenAny() {
		return anonymous.length ? { anonymous } : null;
	}
}

function *getParents(
	ancestors
) {
	let previous = null;

	for (let index = ancestors.length - 2; index; index--) {
		const current = ancestors[index];

		yield getParentFromCurrentAndPrevious({ current, previous });

		previous = current;
	}
}

function getParentFromCurrentAndPrevious({
	current,
	previous,
}) {
	return (
		{
			functionDeclaration:
				current.type === "FunctionDeclaration"
				&&
				current,
			functionExpression:
				previous
				&&
				isFunctionExpressionType(previous.type)
				&&
				previous,
			isIdentifiable:
				isIdentifiableType(current.type),
		}
	);
}

function isFunctionExpressionType(
	type
) {
	return (
		type === "ArrowFunctionExpression"
		||
		type === "FunctionExpression"
	);
}

function isIdentifiableType(
	type
) {
	return (
		type === "AssignmentExpression"
		||
		type === "VariableDeclarator"
	);
}