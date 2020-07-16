using System;

class Class {
	void Method() {
		#pragma warning disable CS0219
		String variable = nameof(NameofClass);
		#pragma warning restore CS0219
	}
}