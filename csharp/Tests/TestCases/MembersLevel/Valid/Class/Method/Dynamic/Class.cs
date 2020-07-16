using System;

class Class {
	void Method() {
		#pragma warning disable CS0168
		dynamic variable;
		#pragma warning restore CS0168
	}
}