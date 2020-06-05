using System.Collections;

class Class {
	PropertyClass Property { get; set; }

	class NestedClass { }

	void Method() {}

	#pragma warning disable CS0169
	FieldClass _field;
	#pragma warning restore CS0169

	#pragma warning disable CS0067
	event EventDelegate Event;
	#pragma warning restore CS0067
}