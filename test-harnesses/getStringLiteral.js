module.exports = value => getQuoted(getEscaped(value));

function getQuoted(
	value,
) {
	return `"${value}"`;
}

function getEscaped(
	value,
) {
	return (
		value
		.replace(/"/g, "\\$&")
		.replace(/\n/g, "\\n")
	);
}