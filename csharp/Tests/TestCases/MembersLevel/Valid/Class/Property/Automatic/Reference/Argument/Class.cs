class Class {
	static PropertyClass Property { get; set; }

	void Method() {
		Callee(Property);
	}

	void Callee(PropertyClass parameter) { }
}