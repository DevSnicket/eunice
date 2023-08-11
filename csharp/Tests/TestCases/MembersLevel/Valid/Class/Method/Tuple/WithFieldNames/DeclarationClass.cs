class DeclarationClass {
	void Method() {
		#pragma warning disable CS0219
		(TupleItem1Class TupleItem1, TupleItem2Class TupleItem2) variable = (null, null);
		#pragma warning restore CS0219
	}
}