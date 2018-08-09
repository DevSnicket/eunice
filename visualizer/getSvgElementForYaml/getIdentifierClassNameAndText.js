module.exports =
	({
		baseClassName,
		identifier,
	}) => (
		{
			className:
				[
					baseClassName,
					...identifier ? [] : [ "anonymous" ],
				]
				.join(" "),
			text:
				identifier || "anonymous",
		}
	);