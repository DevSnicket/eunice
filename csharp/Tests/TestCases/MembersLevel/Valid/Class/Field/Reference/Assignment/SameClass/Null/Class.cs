class Class {
	#pragma warning disable CS0414
	static FieldClass _field;
	#pragma warning restore CS0414

	void Method() {
		_field = null;
	}
}