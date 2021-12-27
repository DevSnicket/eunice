function containerFunctionDeclaration(parameter) {
	const constFunctionExpression = () => {};

	function caller() {
		constFunctionExpression();
		parameter();
	}
}