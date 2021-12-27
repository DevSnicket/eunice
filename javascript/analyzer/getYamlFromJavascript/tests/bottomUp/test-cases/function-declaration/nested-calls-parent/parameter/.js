function parentFunctionDeclaration(
	parentParameter,
) {
	function nestedFunctionDeclaration() {
		parentParameter();
	}
}