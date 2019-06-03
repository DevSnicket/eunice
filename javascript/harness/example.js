function called() {}

function notCalled() {}

function Callee() {
	called();
	nestedInCallee();

	function nestedInCallee() {}
}