function containerFunctionDeclaration(parameter) {
	const constUsedForArgument = null;

	function caller() {
		parameter(constUsedForArgument);
	}
}