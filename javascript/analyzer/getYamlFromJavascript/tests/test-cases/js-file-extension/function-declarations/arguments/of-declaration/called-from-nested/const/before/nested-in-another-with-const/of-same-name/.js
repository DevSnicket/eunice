function container1() {
	const variable = 0;

	function container2() {
		const variable = 0;

		function caller() {
			called(variable);
		}
	}
}