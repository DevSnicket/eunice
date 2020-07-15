class Class {
	void CallerMethod() {
		NestedClass.CalledMethod();
	}

	class NestedClass {
		public static void CalledMethod() { }
	}
}