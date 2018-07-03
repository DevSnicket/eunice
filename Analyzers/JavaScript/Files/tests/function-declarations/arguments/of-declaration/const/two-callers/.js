function container() {
	const aConst = 0;

	function caller1() {
		called(aConst);
	}

	function caller2() {
		called(aConst);
	}
}