module.exports =
	identifierExpression =>
		identifierExpression.type === "ObjectPattern"
		&&
		identifierExpression.properties.map(property => property.value.name);