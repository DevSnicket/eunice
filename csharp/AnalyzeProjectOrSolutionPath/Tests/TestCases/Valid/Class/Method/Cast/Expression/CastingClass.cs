class CastingClass {
	void Method() {
		#pragma warning disable CS0219
		var variable = (CastedClass)null;
		#pragma warning restore CS0219
	}
}