class Class {
	#pragma warning disable CS0067
	event EventDelegate Event;
	#pragma warning restore CS0067

	#pragma warning disable CS0169
	FieldClass _field;
	#pragma warning restore CS0169

	void Method() { }

	class NestedClass { }

	PropertyClass Property { get; set; }
}