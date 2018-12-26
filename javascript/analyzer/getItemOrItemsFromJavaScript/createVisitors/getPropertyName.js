module.exports =
	property =>
		property.type === "RestElement"
		?
		property.argument.name
		:
		getNameFromValue(property.value);

function getNameFromValue(
	value,
) {
	return (
		value.type === "AssignmentPattern"
		?
		value.left.name
		:
		value.name
	);
}