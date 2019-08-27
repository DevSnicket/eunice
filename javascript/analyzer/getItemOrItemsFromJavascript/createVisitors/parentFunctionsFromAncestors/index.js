// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getParents = require("./getParents");

module.exports =
	{
		findBlockOrIdentifiableParent,
		findParents,
	};

function findBlockOrIdentifiableParent(
	ancestors,
) {
	for (const parent of getParents(ancestors)) {
		const blockOrIdentifiableParent =
			getWhenBlockOrIdentifiable(
				parent,
			);

		if (blockOrIdentifiableParent)
			return blockOrIdentifiableParent;
	}

	return null;
}

function getWhenBlockOrIdentifiable({
	functionDeclaration,
	functionExpression,
	isBlock,
	isIdentifiable,
}) {
	return (
		functionDeclaration
		||
		whenExpression()
	);

	function whenExpression() {
		return (
			(isBlock || isIdentifiable)
			&&
			functionExpression
		);
	}
}

function findParents(
	ancestors,
) {
	const anonymous = [];

	for (const parent of getParents(ancestors)) {
		if (parent.functionExpression)
			if (parent.isBlock || parent.isIdentifiable)
				return createWithBlockOrIdentifiable(parent.functionExpression);
			else
				anonymous.push(parent.functionExpression);

		if (parent.functionDeclaration)
			return createWithBlockOrIdentifiable(parent.functionDeclaration);
	}

	return getAnonymousPropertyWhenAny();

	function createWithBlockOrIdentifiable(
		blockOrIdentifiable,
	) {
		return (
			{
				...getAnonymousPropertyWhenAny(),
				blockOrIdentifiable,
			}
		);
	}

	function getAnonymousPropertyWhenAny() {
		return anonymous.length ? { anonymous } : null;
	}
}