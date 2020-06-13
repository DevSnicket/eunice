using System.Collections.Generic;

class YieldCallerClass {
	static IEnumerable<ReturnClass> CallerAndYieldMethod() {
		yield return CalleeClass.CalledMethod();
	}
}