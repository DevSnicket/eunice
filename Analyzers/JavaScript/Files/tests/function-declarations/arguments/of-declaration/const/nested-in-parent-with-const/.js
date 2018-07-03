function container1() {
	const const1 = 0;

	function container2() {
		const const2 = 0;

		function caller() {
			called(const2);
		}
	}
}