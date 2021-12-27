class YieldCallerClass {
	static System.Collections.Generic.IEnumerable<ReturnClass> CallerAndYieldMethod() {
		yield return CalleeClass.CalledMethod();
	}
}