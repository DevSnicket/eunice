class Class {
	void Method(
		MethodParameterClass parameter
	) {
		LocalFunction(null);

		static void LocalFunction(
			LocalFunctionParameterClass parameter
		) {
			#pragma warning disable CS0168
			LocalFunctionVariableClass localFunctionVariable;
			#pragma warning restore CS0168
		}
	}
}