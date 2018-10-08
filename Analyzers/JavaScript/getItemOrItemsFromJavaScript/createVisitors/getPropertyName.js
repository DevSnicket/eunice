module.exports =
	property =>
		property.type === "RestElement"
		?
		property.argument.name
		:
		property.value.name;