class Class {
	static PropertyClass Property { get; set; }

	void Method() {
		Callee(Property);
	}
}