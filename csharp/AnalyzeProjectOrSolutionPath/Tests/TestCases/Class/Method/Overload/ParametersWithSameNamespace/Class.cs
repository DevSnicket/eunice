class Class {
	void Method() {
		Method(null);
	}

	void Method(
		ParameterNamespace.Parameter1Class parameter1
	) {
		Method(null, null);
	}

	void Method(
		ParameterNamespace.Parameter1Class parameter1
		ParameterNamespace.Parameter2Class parameter2
	) {
		Method();
	}
}