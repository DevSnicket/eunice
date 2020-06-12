namespace Namespace {
	class Class {
		void Method() {
			SameNameClass nested;
			Namespace.SameNameClass sibling;
		}

		class SameNameClass { }
	}
}