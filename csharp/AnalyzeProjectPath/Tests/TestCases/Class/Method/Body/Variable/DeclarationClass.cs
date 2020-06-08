using System;

class DeclarationClass {
	void Method() {
		#pragma warning disable CS0168
		VariableClass variable;
		#pragma warning restore CS0168
	}
}