function caller() {
	called(() => calledByCalled());
}

function calledByCalled() {}