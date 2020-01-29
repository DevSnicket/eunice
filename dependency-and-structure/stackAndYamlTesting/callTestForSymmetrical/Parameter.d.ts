export = Parameter

type Parameter = (stackAndYamlTest: StackAndYamlTest) => void

interface StackAndYamlTest {
	readonly getActual: ({ stack, yaml }) => any
	readonly getExpected: ({ stack, yaml }) => any
	readonly getName: ({ stackDescription: string, yaml }) => string
}