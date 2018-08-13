module.exports =
	expression => {
		return (
			getWhenObjectPattern()
			||
			{
				identifiers: [ expression.name ],
				isDestructured: false,
			}
		);

		function getWhenObjectPattern() {
			return (
				expression.type === "ObjectPattern"
				&&
				{
					identifiers: expression.properties.map(property => property.value.name),
					isDestructured: true,
				}
			);
		}
	};