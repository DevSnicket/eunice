module.exports =
	{
		format:
			identifierHierarchy =>
				identifierHierarchy
				.map(
					identifier =>
						identifier || anonymous,
				)
				.join(separator),
		parse:
			identifierHierarchy =>
				identifierHierarchy
				.split(separator)
				.map(
					identifier =>
						identifier === "undefined"
						?
						// the item id property wont be defined
						// eslint-disable-next-line no-undefined
						undefined
						:
						identifier,
				),
	};

const
	anonymous = "undefined",
	separator = "/";