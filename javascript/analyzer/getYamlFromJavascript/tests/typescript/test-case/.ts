function caller(calledParameter: any): void {
	const calledFunctionArrowVariable: () => void = () => {};

	calledParameter();
	calledFunctionArrowVariable();
}