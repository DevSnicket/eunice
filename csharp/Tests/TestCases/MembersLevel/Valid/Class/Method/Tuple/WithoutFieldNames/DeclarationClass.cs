class DeclarationClass {
	void Method() {
		#pragma warning disable CS0219
		(TupleItem1Class, TupleItem2Class) variable = (null, null);
		#pragma warning restore CS0219
	}
}