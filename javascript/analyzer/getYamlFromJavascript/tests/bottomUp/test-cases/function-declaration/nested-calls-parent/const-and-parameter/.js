function parentFunctionDeclaration(
	parentParameter,
) {
	const parentConst = null;

	function nestedFunctionDeclaration() {
		parentConst();
		parentParameter();
	}
}