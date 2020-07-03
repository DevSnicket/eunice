using System;

class DeclarationClass {
	void Method() {
		#pragma warning disable CS0828
		var variable = new { Property = "" };
		#pragma warning restore CS0828
	}
}