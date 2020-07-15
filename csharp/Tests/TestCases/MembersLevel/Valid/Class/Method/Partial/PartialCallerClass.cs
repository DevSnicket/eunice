partial class PartialCallerClass {
	partial void Part1CallerMethod();

	partial void Part2CallerMethod() {
		Part2CalleeClass.Part2CalleeMethod();
	}
}

partial class PartialCallerClass {
	partial void Part1CallerMethod() {
		Part1CalleeClass.Part1CalleeMethod();
	}

	partial void Part2CallerMethod();
}