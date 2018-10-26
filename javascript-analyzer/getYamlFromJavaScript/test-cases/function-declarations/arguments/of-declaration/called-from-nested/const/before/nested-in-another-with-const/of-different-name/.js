function container1() {
	const variable1 = 0;

	function container2() {
		const variable2 = 0;

		function caller() {
			called(variable2);
		}
	}
}