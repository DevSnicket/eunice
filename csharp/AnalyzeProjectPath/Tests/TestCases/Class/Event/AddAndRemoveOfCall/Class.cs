class Class {
	event EventDelegate Event {
		add => CalleeOfAddClass.CalleeOfAddMethod();
		remove => CalleeOfRemoveClass.CalleeOfRemoveMethod();
	}
}