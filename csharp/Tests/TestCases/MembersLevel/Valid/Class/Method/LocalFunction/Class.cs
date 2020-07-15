class Class {
	void Method(
		MethodParameterClass parameter
	) {
		#pragma warning disable CS0219
		MethodVariableClass methodVariable;
		#pragma warning restore CS0219

		LocalFunction(null);

		void LocalFunction(
			LocalFunctionParameterClass parameter
		) {
			#pragma warning disable CS0168
			LocalFunctionVariableClass localFunctionVariable;
			#pragma warning restore CS0168

			methodVariable = null;
		}
	}
}