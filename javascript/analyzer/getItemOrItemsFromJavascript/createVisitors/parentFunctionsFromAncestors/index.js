/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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