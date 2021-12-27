class Class {
	void Method() {
		#pragma warning disable CS0168
		NestedClass variable;
		#pragma warning restore CS0168
	}

	class NestedClass {}
}