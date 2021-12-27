function file() {}

export default function() {
	function nested() {}

	nested();
	file();
}