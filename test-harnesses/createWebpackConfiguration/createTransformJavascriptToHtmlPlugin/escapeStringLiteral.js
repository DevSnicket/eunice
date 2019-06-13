module.exports =
	stringLiteral =>
		escapeDoubleQuote(
			escapeBackslash(
				stringLiteral,
			),
		);

function escapeBackslash(
	stringLiteral,
) {
	return (
		stringLiteral
		.replace(
			/\\/g,
			"\\\\",
		)
	);
}

function escapeDoubleQuote(
	stringLiteral,
) {
	return (
		stringLiteral
		.replace(
			/"/g,
			"\\\"",
		)
	);
}