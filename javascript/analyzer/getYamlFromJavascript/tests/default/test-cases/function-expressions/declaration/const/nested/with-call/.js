const parent = function(
	parameter,
) {
	const child = function() {
		parameter();
	}
}