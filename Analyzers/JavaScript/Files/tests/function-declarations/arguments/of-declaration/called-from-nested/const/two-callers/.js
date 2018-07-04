function container() {
	const variable = 0;

	function caller1() {
		called(variable);
	}

	function caller2() {
		called(variable);
	}
}