class Class {
	static FieldClass _field;

	void Method() {
		Callee(_field);
	}

	void Callee(FieldClass parameter) { }
}