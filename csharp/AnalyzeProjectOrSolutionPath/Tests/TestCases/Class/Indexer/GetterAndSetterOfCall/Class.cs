using System;

class Class {
	IndexerClass this[Object index] {
		get => CalleeOfGetterClass.CalleeOfGetterMethod();
		set => CalleeOfSetterClass.CalleeOfSetterMethod();
	}
}