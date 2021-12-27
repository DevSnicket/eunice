function parentFunctionDeclaration() {
	const parentConst = null;

	function nestedFunctionDeclaration() {
		parentConst();
	}
}